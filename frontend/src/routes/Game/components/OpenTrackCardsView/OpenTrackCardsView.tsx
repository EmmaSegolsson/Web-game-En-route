import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import styled from "styled-components";

import { TrackColor } from "@typeDef/types";
import { RootState } from "redux/store";

import TrackCard from "../TrackCard";
import TrackCardBack from "../TrackCard/TrackCardBack";
import socketEmit from "utils/socketEmit";
import { socketContext } from "context/socket";

const OpenTrackCardsViewWrapper = styled.div`
  padding-left: 0.5rem;
  width: 10%;
`;

const TrackCardWrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 0.8rem;
`;

const BackCardWrapper = styled.div`
  margin-right: 10px;
`;

const OpenTrackCardsView: FC = () => {
  const socket = useContext(socketContext);
  const { enqueueSnackbar } = useSnackbar();
  const { openTrackCards, playerId, currentPlayer } = useSelector(
    (state: RootState) => state.game,
  );

  const handleOpenTrackCardsClick = (trackCard: TrackColor) => {
    if (trackCard && socket) {
      try {
        if (!openTrackCards.includes(trackCard)) {
          throw new Error("That card does not exists in OpenTrackCards!");
        }
        socketEmit(socket, "pick_card_from_openTrackCards", trackCard);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };

  const handleTrackCardsClick = () => {
    if (socket) {
      socketEmit(socket, "pick_card_from_trackCards");
    }
  };

  return (
    <OpenTrackCardsViewWrapper>
      {openTrackCards.map((trackCard, idx) => {
        return (
          <TrackCardWrapper
            key={`${trackCard}-${idx}`}
            onClick={() => handleOpenTrackCardsClick(trackCard)}
          >
            <TrackCard
              key={`${trackCard}-${idx}`}
              color={trackCard}
              style={{
                width: "100%",
                cursor: playerId === currentPlayer ? "pointer" : "default",
              }}
              rotate
              onOpenTrackCards={playerId === currentPlayer}
            />
          </TrackCardWrapper>
        );
      })}
      <BackCardWrapper onClick={() => handleTrackCardsClick()}>
        <TrackCardBack
          style={{
            width: "100%",
            cursor: playerId === currentPlayer ? "pointer" : "default",
          }}
        />
      </BackCardWrapper>
    </OpenTrackCardsViewWrapper>
  );
};

export default OpenTrackCardsView;
