import {
  Ticket,
  PlayerTrackCards,
  TrackColor,
  GameRoutes,
  Route,
  PlayerAction,
  PlayerClient,
  SocketResponse,
  AddSocketPayload,
} from "@typeDef/types";
import { BroadcastOperator, Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import uniqid from "uniqid";
import cloneDeep from "lodash.clonedeep";

import {
  initialGameTrackCards,
  initialPlayerTrackCards,
  playerColors,
} from "./constants";
import { PlayerColor } from "@typeDef/types";
import { initialShortTickets, initialLongTickets } from "./initialTickets";
import { firstCap, routeToCities, shuffleArray } from "../utils/helpers";
import initialRoutes from "./initialRoutes";
import { SocketError } from "../utils/SocketError";

class Game {
  gameToken: string;
  creator: Player;
  gameRoomSocket: BroadcastOperator<DefaultEventsMap> | undefined;
  joinable: boolean;
  gameStarted: boolean;

  currentPlayer: string | undefined;
  lastRoundStartedBy: Player | undefined;

  players: Player[];
  trackCards: TrackColor[];
  openTrackCards: TrackColor[];
  discardedTrackCards: TrackColor[];
  availableShortTickets: Ticket[];
  availableLongTickets: Ticket[];
  routes: GameRoutes;

  constructor() {
    this.gameToken = uniqid("game#");
    this.gameRoomSocket = undefined;
    this.creator = new Player(
      playerColors[Math.floor(Math.random() * (playerColors.length - 1))],
    );
    this.joinable = true;
    this.gameStarted = false;

    this.players = [this.creator];

    this.trackCards = shuffleArray(initialGameTrackCards);
    this.openTrackCards = [];
    this.discardedTrackCards = [];
    this.routes = cloneDeep(initialRoutes);

    this.availableShortTickets = shuffleArray(initialShortTickets);
    this.availableLongTickets = shuffleArray(initialLongTickets);
  }

  addSocket(_socket: Socket, _io: Server, playerId: string) {
    if (playerId == this.creator.id) {
      this.gameRoomSocket = _io.to(this.gameToken);
    }

    const playerIdx = this.players.findIndex(
      (_player) => _player.id === playerId,
    );
    if (playerIdx !== -1) {
      _socket.join(this.gameToken);
      this.players[playerIdx].setSocket(_socket);
      this.gameEvents(_socket);
    }

    this.emitPlayers();
  }

  addPlayer() {
    // const playerAlreadyInGame = this.players.find(
    //   (p) => p.id === socket.id,
    // );
    // if (playerAlreadyInGame) {
    //   throw new Error("join_game/already_in_game");
    // }

    const newPlayer = new Player(this.assignColor());
    this.players.push(newPlayer);
    if (this.players.length > 4) this.joinable = false;

    return {
      playerId: newPlayer.id,
      color: newPlayer.color,
      nickname: newPlayer.nickname,
      remainingTracks: newPlayer.remainingTracks,
      haveChosenTickets: newPlayer.haveChosenTickets,
    };
  }

  private emitOpenTrackCards() {
    this.gameRoomSocket?.emit("open_track_cards", this.openTrackCards);
  }

  private emitRoutes(message: string) {
    const emitMessage: SocketResponse<GameRoutes> = {
      success: true,
      message,
      payload: this.routes,
    };
    this.gameRoomSocket?.emit("routes", emitMessage);
  }

  private emitTrackCards(
    socket: Socket,
    trackCards: PlayerTrackCards,
    message: string,
  ) {
    const emitMessage: SocketResponse<PlayerTrackCards> = {
      success: true,
      message,
      payload: trackCards,
    };
    socket.emit("track_cards", emitMessage);
  }

  private emitTickets(socket: Socket, tickets: Ticket[]) {
    socket.emit("tickets", tickets);
  }

  private emitPlayers() {
    if (this.gameRoomSocket) {
      const _players: PlayerClient[] = [];
      for (const player of this.players) {
        _players.push({
          playerId: player.id,
          color: player.color,
          nickname: player.nickname,
          remainingTracks: player.remainingTracks,
          haveChosenTickets: player.haveChosenTickets,
          points: player.points,
          creator: this.creator.id === player.id ? true : false,
        });
      }
      this.gameRoomSocket.emit("players", _players);
    }
  }

  private emitFinalRound(emitMessage: string) {
    this.gameRoomSocket?.emit("routes", emitMessage);
  }

  private emitCurrentPlayer(currentPlayer: string) {
    this.gameRoomSocket?.emit("currentPlayer", currentPlayer);
  }

  private emitBuildRoute(
    socket: Socket,
    success: boolean,
    message: string,
    code: string,
  ) {
    const emitMessage: SocketResponse<string> = {
      success,
      message,
      payload: code,
    };

    socket.emit("build_route", emitMessage);
  }

  private nextPlayer() {
    try {
      // Next player
      if (!this.currentPlayer) {
        throw new Error();
      }

      const currentPlayerIdx = this.players.findIndex(
        (p) => p.id === this.currentPlayer,
      );

      if (currentPlayerIdx === -1) {
        throw new Error("Something went wrong");
      }

      // Reset the previous action of current player
      this.players[currentPlayerIdx].previousAction = "none";

      // If current player is the last in this.players => assign next player index to 0
      const nextPlayerIdx =
        currentPlayerIdx + 1 >= this.players.length ? 0 : currentPlayerIdx + 1;

      this.currentPlayer = this.players[nextPlayerIdx].id;
      this.emitCurrentPlayer(this.players[nextPlayerIdx].id);
    } catch (err) {
      if (err.message) console.log(err.message);
      // Random player
      this.currentPlayer = this.players[
        Math.floor(Math.random() * this.players.length)
      ].id;
    }
  }

  private assignColor(): PlayerColor {
    const gamePlayerColors = this.players.map((player) => player.color);
    const availableColors = playerColors.filter(
      (color) => !gamePlayerColors.includes(color),
    );

    if (!availableColors.length) {
      throw new SocketError("All colors are taken", "game/all_colors_taken");
    }
    return availableColors[0];
  }

  private dealTicket(player: Player, availableTickets: Ticket[]) {
    const pickedTicket = availableTickets.shift();
    if (pickedTicket) {
      player.addTicket(pickedTicket);
    } else {
      throw new SocketError(
        "No available tickets",
        "game/no-available-tickets",
      );
    }
  }

  private dealTrackCard(player: Player) {
    if (!this.trackCards.length) {
      this.trackCards = shuffleArray(this.discardedTrackCards);
      this.discardedTrackCards = [];
    }

    const pickedTrackCard = this.trackCards.shift();

    if (pickedTrackCard) {
      player.addTrackCard(pickedTrackCard);
    } else {
      throw new SocketError(
        "No available track cards",
        "game/no-available-track-cards",
      );
    }
  }

  private countPoints(routeLength: number): number {
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 7;
    const FIVE = 10;
    const SIX = 15;

    switch (routeLength) {
      case 1:
        return ONE;
      case 2:
        return TWO;
      case 3:
        return THREE;
      case 4:
        return FOUR;
      case 5:
        return FIVE;
      case 6:
        return SIX;
      default:
        return 0;
    }
  }

  private pickTrackCard() {
    if (!this.trackCards.length) {
      this.trackCards = shuffleArray(this.discardedTrackCards);
      this.discardedTrackCards = [];
    }

    const pickedTrackCard = this.trackCards.shift();

    if (pickedTrackCard) {
      return pickedTrackCard;
    } else {
      throw new SocketError(
        "No available track cards",
        "game/no-available-track-cards",
      );
    }
  }

  private async setupGame(socket: Socket) {
    try {
      if (socket.id !== this.creator.socket?.id) {
        throw new SocketError(
          "Unauthorized: Only the creator of a game can start",
          "unauthorized/creator_only",
        );
      }

      // TODO: Uncomment
      // Disabled so you don't need >=2
      // players to test funcitonality
      if (this.players.length < 2) {
        throw new SocketError(
          "There are not enough players to start the game",
          "game/not_enough_players",
        );
      }

      this.joinable = false;

      // The code below is to deal 4 random track cards and
      // 4 tickets (including 1 long ticket)

      // Loop over all players
      for (const player of this.players) {
        // Check if player is connected
        if (player.socket) {
          // Loop 4 times (because we will deal 4 tickets and 4 track cards)
          for (let step = 0; step < 4; ++step) {
            // In the first iteration, a long ticket will be dealt
            if (step == 0) {
              this.dealTicket(player, this.availableLongTickets);
            } else {
              this.dealTicket(player, this.availableShortTickets);
            }

            // For each iteration deal a random track card to the player
            this.dealTrackCard(player);
          }

          this.emitTickets(player.socket, player.tickets);
          this.emitTrackCards(player.socket, player.trackCards, "init");
        }
      }

      this.emitRoutes("init");
    } catch (error) {
      socket.emit("setup_game", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  private pickInitialTickets(socket: Socket, chosenTickets: Ticket[]) {
    try {
      const player = this.players.find(
        (p) => p.socket && p.socket.id === socket.id,
      );

      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }

      if (!player.socket) {
        throw new SocketError("Player inactive", "game/player_inactive");
      }

      // Player must keep 2 tickets
      if (chosenTickets.length < 2) {
        throw new SocketError(
          "You must keep at least two tickets",
          "game/must_keep_two_tickets",
        );
      }

      //Chosen tickets must match the dealt tickets
      const correctlyChosenTickets = chosenTickets.filter(
        (ct) =>
          player.tickets.filter(
            (pt) => ct.start === pt.start && ct.end === pt.end,
          ).length,
      ).length;

      if (!correctlyChosenTickets) {
        throw new SocketError(
          "The chosen tickets doesn't match the dealt tickets",
          "game/incorrectly_chosen_tickets",
        );
      }

      player.tickets = Array.from(chosenTickets);
      player.haveChosenTickets = true;
      this.emitTickets(socket, player.tickets);

      // If all players have chosen tickets => start game
      if (!this.players.find((p) => !p.haveChosenTickets)) {
        this.gameStarted = true;

        // Shuffle player array to get a new order and emit to all clients
        this.players = shuffleArray(this.players);
        this.emitPlayers();

        // Set the first player
        this.currentPlayer = this.players[0].id;
        this.emitCurrentPlayer(this.players[0].id);

        // Send five open track cards to all players
        this.openTrackCards = Array.from(this.trackCards.splice(0, 5));
        this.emitOpenTrackCards();
      }
    } catch (error) {
      socket.emit("pick_initial_tickets", {
        success: false,
        message: error.message,
        code: error.code,
      });
    }
  }

  private buildRoute(
    socket: Socket,
    route: Route,
    chosenTrackCards: TrackColor[],
  ) {
    const [city1, city2] = routeToCities(route);

    try {
      if (!this.gameStarted) {
        throw new SocketError(
          "The game hasn't started yet!",
          "game/not_started",
        );
      }

      const player = this.players.find(
        (p) => p.socket && p.socket.id === socket.id,
      );
      //Separate potential bridge cards and track cards of other colors.
      const chosenBridgeCards = chosenTrackCards.filter(
        (card) => card === "bridge",
      );
      const chosenColoredTrackCards = chosenTrackCards.filter(
        (card) => card !== "bridge",
      );

      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }

      // Check is it the player's turn.
      if (this.currentPlayer && this.currentPlayer !== player.id) {
        throw new SocketError("Its not your turn.", "game/not_your_turn");
      }

      if (player.previousAction !== "none") {
        throw new SocketError(
          "You have already picked up a card and can therefore not build on this round",
          "game/cant_build",
        );
      }

      if (!this.routes.hasOwnProperty(route)) {
        // Route does not exist
        throw new SocketError(
          "Route not found on game map.",
          "game/route_not_found",
        );
      }

      // Check if all colored cards is the same color.
      if (
        chosenColoredTrackCards.length &&
        !chosenColoredTrackCards.every(
          (value) => value === chosenColoredTrackCards[0],
        )
      ) {
        throw new SocketError(
          "You can not build a route with multiple types of track cards",
          "game/multiple_colored_track_cards",
        );
      }

      // Does the player have enough chosen cards?
      if (this.routes[route].length !== chosenTrackCards.length) {
        throw new SocketError(
          `invalid amount of chosen track cards to build ${city1} to ${city2}.`,
          "game/not_enough_chosen_cards",
        );
      }

      // Does the player have enough track cards?
      if (player.remainingTracks < this.routes[route].length) {
        this.emitTrackCards(
          socket,
          player.trackCards,
          `Your track cards were out of sync and are now updated.`,
        );
        throw new SocketError(
          `You don't have enough tracks to build ${city1} to ${city2}.`,
          "game/not_enough_tracks",
        );
      }

      // Does the player have enough bridges?
      if (
        this.routes[route].bridges > player.trackCards.bridge.amount &&
        chosenBridgeCards.length < player.trackCards.bridge.amount
      ) {
        this.emitTrackCards(
          socket,
          player.trackCards,
          `Your track cards were out of sync and are now updated.`,
        );
        throw new SocketError(
          `Not enough bridge cards to build ${city1} to ${city2}.`,
          "game/not_enough_bridge_cards",
        );
      }

      // Does the player have the chosen cards of the chosen color?
      if (
        chosenColoredTrackCards.length &&
        chosenColoredTrackCards.length >
          player.trackCards[chosenColoredTrackCards[0]].amount
      ) {
        this.emitTrackCards(
          socket,
          player.trackCards,
          `Your track cards were out of sync and are now updated.`,
        );
        throw new SocketError(
          `Not enough cards of the chosen color to build ${city1} to ${city2}.`,
          "game/not_enough_chosen_colored_cards",
        );
      }

      /******** BUILD ROUTE ********/
      // Update players trackCards
      player.trackCards["bridge"].amount -= chosenBridgeCards.length;
      if (chosenColoredTrackCards.length) {
        player.trackCards[chosenColoredTrackCards[0]].amount -=
          chosenColoredTrackCards.length;
      }

      // Update the players remainingTracks
      player.remainingTracks -= this.routes[route].length;
      // Mark route as taken
      this.routes[route].builtBy = player.color;
      //Add played cards to discardedTrackCards
      this.discardedTrackCards.push(...chosenTrackCards);

      //Update players points
      player.points += this.countPoints(this.routes[route].length);

      // Is it time for the final round?
      if (player.remainingTracks < 3) {
        this.lastRoundStartedBy = player;
        this.emitFinalRound(
          `${player.nickname} has less than 3 tracks remaining. Start final round!`,
        );
      }

      this.emitRoutes(`${player.nickname} just built ${city1} to ${city2}.`);
      this.emitTrackCards(
        socket,
        player.trackCards,
        `Your track cards are updated`,
      );
      this.emitBuildRoute(
        socket,
        true,
        `You have built ${city1} to ${city2}`,
        "game/built",
      );

      // Next players turn
      this.nextPlayer();
      this.emitPlayers();
    } catch (error) {
      if ("message" in error && "code" in error) {
        const { message, code } = error as SocketError;
        this.emitBuildRoute(socket, false, message, code);
      } else {
        console.log(error);
        this.emitBuildRoute(
          socket,
          false,
          `Could not build ${city1} to ${city2}. Something went wrong!`,
          "game/could_not_build_route",
        );
      }
    }
  }

  private pickCardFromOpenTracksCards(
    socket: Socket,
    pickedTrackCard: TrackColor,
  ) {
    try {
      if (!this.gameStarted) {
        throw new SocketError(
          "The game hasn't started yet!",
          "game/not_started",
        );
      }

      const player = this.players.find(
        (p) => p.socket && p.socket.id === socket.id,
      );

      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }

      if (!this.currentPlayer) {
        this.nextPlayer();
      }

      // Check is it the player's turn.
      if (this.currentPlayer && this.currentPlayer !== player.id) {
        throw new SocketError("Its not your turn.", "game/not_your_turn");
      }
      //Does the pickedTrackCard exist in openTrackCards
      if (!this.openTrackCards.includes(pickedTrackCard)) {
        throw new SocketError(
          "The picked track card does not exist in the openTrackCards array",
          "game/openTrackCard_not_found",
        );
      }
      //If the player built a route on the same turn its the next players turn
      if (player.previousAction === "built_route") {
        // Next players turn
        this.nextPlayer();
        throw new SocketError(
          "No more actions left after built route.",
          "game/no_actions_left",
        );
      }
      // If
      if (
        player.previousAction === "picked_track_card" &&
        pickedTrackCard === "bridge"
      ) {
        throw new SocketError(
          "You can not pick up a Bridge card on this move",
          "game/not_able_to_pick_up_bridge",
        );
      }
      /******* Update openTrackCards ******/
      let index = this.openTrackCards.indexOf(pickedTrackCard);
      this.openTrackCards.splice(index, 1);
      let newTrackCard = this.pickTrackCard();
      this.openTrackCards.push(newTrackCard);
      /******* Update players previousAction state ******/

      if (player.previousAction === "none") {
        if (pickedTrackCard === "bridge") {
          player.previousAction = "none";
          // Next players turn
          this.nextPlayer();
        } else {
          player.previousAction = "picked_track_card";
        }
      } else if (player.previousAction === "picked_track_card") {
        player.previousAction = "none";
        // Next players turn
        this.nextPlayer();
      }
      /******* Update players trackCards ******/
      ++player.trackCards[pickedTrackCard].amount;

      this.emitTrackCards(
        socket,
        player.trackCards,
        `${player.nickname} picked up a card from open track cards`,
      );
      this.emitOpenTrackCards();
    } catch (error) {
      if ("message" in error && "code" in error) {
        const { message, code } = error as SocketError;
        socket.emit("pick_card_from_openTrackCards", {
          success: false,
          message: message,
          payload: code,
        });
      } else {
        console.log(error);
        socket.emit("pick_card_from_openTrackCards", {
          success: false,
          message:
            "Something went wrong when trying to pick a card from open track cards",
          payload: "error/pick_card_from_openTrackCards",
        });
      }
    }
  }

  private pickCardFromTracksCards(socket: Socket) {
    const player = this.players.find(
      (p) => p.socket && p.socket.id === socket.id,
    );
    try {
      if (!this.gameStarted) {
        throw new SocketError(
          "The game hasn't started yet!",
          "game/not_started",
        );
      }

      if (!player) {
        throw new SocketError(
          "Player not found in the game",
          "game/player_not_found",
        );
      }
      // Check is it the player's turn.
      if (this.currentPlayer && this.currentPlayer !== player.id) {
        throw new SocketError("Its not your turn.", "game/not_your_turn");
      }

      /******* Update players previousAction state ******/
      if (player.previousAction === "none") {
        player.previousAction = "picked_track_card";
      } else {
        player.previousAction = "none";
        // Next players turn
        this.nextPlayer();
      }
      /******* Update players trackCards ******/
      let newTrackCard = this.pickTrackCard();
      player.trackCards[newTrackCard].amount =
        player.trackCards[newTrackCard].amount + 1;

      this.emitTrackCards(
        socket,
        player.trackCards,
        `${player.nickname} picked up a card`,
      );
    } catch (error) {
      if ("message" in error && "code" in error) {
        const { message, code } = error as SocketError;
        socket.emit("pick_card_from_trackCards", {
          success: false,
          message: message,
          payload: code,
        });
      } else {
        console.log(error);
        socket.emit("pick_card_from_trackCards", {
          success: false,
          message: "Something went wrong when trying to pick a track card",
          payload: "error/pick_card",
        });
      }
    }
  }

  gameEvents(socket: Socket) {
    socket.on("setup_game", () => this.setupGame(socket));
    socket.on("pick_initial_tickets", (data: Ticket[]) =>
      this.pickInitialTickets(socket, data),
    );

    const endResponse: SocketResponse<AddSocketPayload> = {
      success: true,
      message: "game/ended_game",
      payload: "The game has now ended!",
    };
    if (socket === this.lastRoundStartedBy?.socket) {
      socket.emit("end_game", endResponse);
    }

    type BuildRouteRequest = {
      route: Route;
      chosenTrackCards: TrackColor[];
    };
    socket.on("build_route", (data: BuildRouteRequest) =>
      this.buildRoute(socket, data.route, data.chosenTrackCards),
    );
    socket.on("pick_card_from_openTrackCards", (data: TrackColor) =>
      this.pickCardFromOpenTracksCards(socket, data),
    );
    socket.on("pick_card_from_trackCards", () =>
      this.pickCardFromTracksCards(socket),
    );

    const response: SocketResponse<AddSocketPayload> = {
      success: true,
      message: "add_socket/added",
      payload: "You are now connected to the game",
    };
    socket.emit("add_socket", response);
  }
}

class Player {
  id: string;
  socket?: Socket;
  color: PlayerColor;
  nickname: string;
  tickets: Ticket[];
  trackCards: PlayerTrackCards;
  remainingTracks: number;
  haveChosenTickets: boolean;
  previousAction: PlayerAction;
  points: number;

  constructor(_color: PlayerColor) {
    this.id = uniqid("player#");
    // this.socket = _socket;
    this.tickets = [];
    this.trackCards = cloneDeep(initialPlayerTrackCards);
    this.color = _color;
    this.nickname = `${_color[0].toUpperCase()}${_color.substring(1)}`;
    this.remainingTracks = 45;
    this.haveChosenTickets = false;
    this.previousAction = "none";
    this.points = 0;

    this.socketListeners();
  }

  setSocket(_socket: Socket) {
    this.socket = _socket;
  }

  setNickname(newNickname: string): void {
    this.nickname = newNickname;
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  addTrackCard(color: TrackColor) {
    ++this.trackCards[color].amount;
  }

  socketListeners() {
    if (this.socket) {
      this.socket.on("set_nickname", (newNickname: string) =>
        this.setNickname(newNickname),
      );
    }
  }
}

export default Game;
