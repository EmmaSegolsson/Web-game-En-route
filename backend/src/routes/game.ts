import { Request, Response } from "express";
import Game from "../game/Game";
import { Games } from "index";
import { APIError } from "../utils/APIError";

export const createGame = (req: Request, res: Response, games: Games) => {
  // TODO: create a game by creating instance of the Game class.
  // The request (req) should contain the suitable data to send into the constructor
  try {
    const newGame = new Game();
    games[newGame.gameToken] = newGame;

    return res.status(200).json({
      success: true,
      message: "create_game/created",
      payload: {
        gameToken: newGame.gameToken,
        player: {
          playerId: newGame.creator.id,
          color: newGame.creator.color,
          nickname: newGame.creator.nickname,
          remainingTracks: newGame.creator.remainingTracks,
          haveChosenTickets: newGame.creator.haveChosenTickets,
        },
      },
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const joinGame = (req: Request, res: Response, games: Games) => {
  try {
    // TODO: join a game
    const gameToken = req.body.gameToken;
    const game = games[gameToken];

    if (!game) {
      throw new APIError("Game not found", "join_game/not_found", 404);
    }

    if (!game.joinable) {
      throw new APIError("Game full", "join_game/full", 403);
    }

    const playerInfo = game.addPlayer();

    res.status(200).json({
      success: true,
      message: "join_game/joined",
      payload: {
        gameToken: gameToken,
        player: playerInfo,
      },
    });
  } catch (err) {
    const response =
      err.code && err.message
        ? {
            code: err.code,
            message: err.message,
          }
        : undefined;
    res.status(err.status || 500).json(response);
  }
};
