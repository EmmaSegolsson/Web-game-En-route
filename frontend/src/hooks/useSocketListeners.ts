import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import {
  setOpenTrackCards,
  setPlayers,
  setCurrentPlayer,
  setRoutes,
  setTickets,
  setTrackCards,
  unsetGame,
} from "../redux/game";
import {
  GameRoutes,
  PlayerClient,
  PlayerTrackCards,
  SocketResponse,
  Ticket,
  TrackColor,
} from "@typeDef/types";
import { RootState } from "redux/store";

const useSocketListeners = (socket: Socket) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState<boolean>(false);
  const { nickname } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    if (socket) {
      setIsListening(true);

      socket.on("open_track_cards", openTrackCardsListener);
      socket.on("routes", routesListener);
      socket.on("track_cards", trackCardsListener);
      socket.on("tickets", ticketsListener);
      socket.on("players", playersListener);
      socket.on("currentPlayer", currentPlayerListener);
      socket.on(
        "pick_card_from_openTrackCards",
        pickFromOpenTrackCardsListener,
      );
      socket.on("pick_card_from_trackCards", pickFromTrackCardsListener);
      socket.on("disconnect", disconnectListener);

      // TODO: Handle pick initial tickets error handling
    }

    return () => {
      socket.off("open_track_cards");
      socket.off("routes");
      socket.off("track_cards");
      socket.off("tickets");
      socket.off("players");
      socket.off("currentPlayer");
      socket.off("pick_card_from_openTrackCards");
      socket.off("pick_card_from_trackCards");
      socket.off("disconnect");
    };
  }, [socket]);

  const openTrackCardsListener = (openTrackCards: TrackColor[]) => {
    if (openTrackCards) {
      dispatch(setOpenTrackCards(openTrackCards));
    }
  };

  const routesListener = (data: SocketResponse<GameRoutes>) => {
    if (data) {
      if (data.message !== "init" && !data.message?.startsWith(nickname)) {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
      dispatch(setRoutes(data.payload));
    }
  };

  const trackCardsListener = (data: SocketResponse<PlayerTrackCards>) => {
    if (data) {
      if (!data.success) {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
      console.log("Updated track cards");
      dispatch(setTrackCards(data.payload));
    }
  };

  const ticketsListener = (tickets: Ticket[]) => {
    if (tickets) {
      dispatch(setTickets(tickets));
    }
  };

  const playersListener = (players: PlayerClient[]) => {
    if (players) {
      dispatch(setPlayers(players));
    }
  };

  const currentPlayerListener = (playerId: string) => {
    if (playerId) {
      dispatch(setCurrentPlayer(playerId));
    }
  };

  const pickFromOpenTrackCardsListener = (
    data: SocketResponse<PlayerTrackCards>,
  ) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
    }
  };

  const pickFromTrackCardsListener = (
    data: SocketResponse<PlayerTrackCards>,
  ) => {
    if (data) {
      if (data.message !== "init") {
        enqueueSnackbar(data.message, {
          variant: data.success ? "success" : "error",
        });
      }
    }
  };

  const disconnectListener = () => {
    // TODO: Maybe some other way later on?
    dispatch(unsetGame());
    enqueueSnackbar("Disconnected from game", {
      variant: "error",
      autoHideDuration: 3000,
    });
    history.push("/");
  };

  return isListening;
};

export default useSocketListeners;
