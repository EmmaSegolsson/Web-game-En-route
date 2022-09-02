import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SnackbarKey, useSnackbar } from "notistack";

import { RootState } from "redux/store";
import { useSelector } from "react-redux";

import TrackCardModal from "./components/TrackCardModal";
import PickInitTicketsModal from "./components/PickInitTicketsModal";
import PlayersView from "./components/PlayersView";
import TrackCardsView from "./components/TrackCardsView";
import GameBoard from "./components/GameBoard";

const GameWrapper = styled.div`
  overflow: hidden;

  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-areas:
    "opponents"
    "."
    "trackCards";
`;

const Game: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { openTrackCards } = useSelector((state: RootState) => state.game);
  const snackbarKey = useRef<SnackbarKey>();

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (openTrackCards.length) {
      setGameStarted(true);
    }
  }, [openTrackCards]);

  useEffect(() => {
    if (!gameStarted) {
      snackbarKey.current = enqueueSnackbar(
        "Waiting for all players to pick their tickets...",
        {
          persist: true,
        },
      );
    } else {
      if (snackbarKey.current) {
        closeSnackbar(snackbarKey.current);
      }
    }
  }, [gameStarted]);

  return (
    <>
      <PickInitTicketsModal />
      <TrackCardModal />
      <GameWrapper>
        <TrackCardsView />
        <PlayersView />
        <GameBoard />
      </GameWrapper>
    </>
  );
};

export default Game;
