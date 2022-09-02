import {
  PlayerColor,
  PlayerClient,
  PlayerTrackCards,
  GameRoutes,
  GameRoute,
  Ticket,
  Route,
  TrackColor,
} from "@typeDef/types";

export type GameState = {
  gameToken: string;
  playerId: string;
  nickname: string;
  color: PlayerColor | "";
  trackCards: PlayerTrackCards;
  tickets: Ticket[];
  remainingTracks: number;
  points: number;
  players: PlayerClient[];
  currentPlayer: string;
  routes: GameRoutes;
  openTrackCards: TrackColor[];
};

export type ChosenRouteState = {
  id?: Route;
  builtBy?: PlayerColor | null;
  color?: RouteColor;
  bridges?: number;
  length?: number;
};
