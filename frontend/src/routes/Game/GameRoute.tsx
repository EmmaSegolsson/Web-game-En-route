import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { socketContext, _DO_NOT_USE_socket } from "../../context/socket";
import useSocketListeners from "../../hooks/useSocketListeners";

import GameLounge from "./GameLounge";
import Game from "./Game";

type GameRouteProps = {};
const GameRoute: FC<GameRouteProps> = ({}) => {
  const isListening = useSocketListeners(_DO_NOT_USE_socket);
  const { tickets } = useSelector((state: RootState) => state.game);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    // When the server has sent tickets to the client, the game has started
    if (tickets && tickets.length) {
      setGameStarted(true);
    }
  }, [tickets]);

  if (isListening) {
    return (
      <socketContext.Provider value={_DO_NOT_USE_socket}>
        {gameStarted ? <Game /> : <GameLounge />}
      </socketContext.Provider>
    );
  }

  return null;
};

export default GameRoute;
