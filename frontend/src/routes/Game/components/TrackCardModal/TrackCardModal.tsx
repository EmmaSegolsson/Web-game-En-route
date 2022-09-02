import React, { FC, useContext, useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  Card,
  Fade,
  Modal,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import cloneDeep from "lodash.clonedeep";
import styled from "styled-components";

import { SocketResponse, TrackColor } from "@typeDef/types";
import { unsetChosenRoute } from "redux/chosenRoute";
import { RootState } from "redux/store";
import { socketContext } from "context/socket";
import socketEmit from "utils/socketEmit";
import TrackCard from "../TrackCard";

const TrackCardWrapper = styled.div`
  /* margin-right: 1rem; */
  padding: 0.3rem;
`;

type CardModalProps = {};
const TrackCardModal: FC<CardModalProps> = ({}) => {
  const dispatch = useDispatch();
  const socket = useContext(socketContext);
  const { enqueueSnackbar } = useSnackbar();
  const { trackCards } = useSelector((state: RootState) => state.game);
  const chosenRoute = useSelector((state: RootState) => state.chosenRoute);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChosenCardsEnough, setIsChosenCardsEnough] = useState<boolean>(
    false,
  );
  const [chosenTrackCards, setChosenTrackCards] = useState<{
    [idx: number]: TrackColor;
  }>({});
  const [availableTrackCards, setAvailableTrackCards] = useState<TrackColor[]>(
    [],
  );

  const toggleTrackCard = (trackColor: TrackColor, idx: number) => {
    let _chosenTrackCards = cloneDeep(chosenTrackCards);
    if (_chosenTrackCards.hasOwnProperty(idx)) {
      delete _chosenTrackCards[idx];
    } else {
      _chosenTrackCards[idx] = trackColor;
    }
    setChosenTrackCards(_chosenTrackCards);
  };

  const handleBuildRoute = () => {
    let _chosenTrackCards = Object.values(chosenTrackCards);
    const data = {
      route: chosenRoute.id,
      chosenTrackCards: _chosenTrackCards,
    };

    if (socket) {
      socketEmit(socket, "build_route", data);
    }
  };

  const handleSocketResponse = (data: SocketResponse<string>) => {
    if (data.success) {
      setChosenTrackCards({});
      enqueueSnackbar(data.message, { variant: "success" });
      setIsModalOpen(false);
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(unsetChosenRoute());
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (socket) {
      socket.on("build_route", handleSocketResponse);
    }
  }, [socket]);

  useEffect(() => {
    try {
      const _chosenTrackCards = Object.values(chosenTrackCards);

      if (_chosenTrackCards.length !== chosenRoute.length) {
        throw new Error();
      }

      if (chosenRoute.color === "any") {
        const noBridges = _chosenTrackCards.filter(
          (trackColor) => trackColor !== "bridge",
        );
        if (!noBridges.every((trackColor, i, arr) => arr[0] === trackColor)) {
          throw new Error();
        }
      }

      if (
        chosenRoute.bridges !== 0 &&
        _chosenTrackCards.filter((color) => color === "bridge").length !==
          chosenRoute.bridges
      ) {
        throw new Error();
      }

      setIsChosenCardsEnough(true);
    } catch (error) {
      setIsChosenCardsEnough(false);
    }
  }, [chosenTrackCards]);

  useEffect(() => {
    if (
      chosenRoute.color &&
      chosenRoute.length &&
      chosenRoute.bridges !== undefined
    ) {
      let _availableTrackCards: TrackColor[] = [];
      const bridgeAmount = trackCards["bridge"].amount;

      for (const trackCard of Object.values(trackCards)) {
        if (
          (trackCard.color === "bridge" && trackCard.amount > 0) ||
          (chosenRoute.color === trackCard.color &&
            trackCard.amount + bridgeAmount >= chosenRoute.length) ||
          (chosenRoute.color === "any" &&
            trackCard.amount + bridgeAmount >= chosenRoute.length)
        ) {
          _availableTrackCards.push(
            ...Array.from(Array(trackCard.amount)).map(() => trackCard.color),
          );
        }
      }
      setAvailableTrackCards(_availableTrackCards);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setChosenTrackCards({});
    }
  }, [chosenRoute]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={isModalOpen}
      onClose={() => dispatch(unsetChosenRoute())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isModalOpen}>
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            border: "4px solid #f9b1cd",
            borderRadius: "4px",
            padding: "10px",
            // maxWidth: "30rem",
            maxHeight: "400px",
          }}
        >
          <Typography variant="h3" style={{ margin: "10px" }}>
            Choose the cards you want to play:
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              overflow: "auto",
              paddingBottom: "10px",
              maxWidth: "34rem",
            }}
          >
            {availableTrackCards.map((trackColor, idx) => {
              return (
                <TrackCardWrapper
                  key={`${trackColor}-${idx}`}
                  onClick={() => toggleTrackCard(trackColor, idx)}
                >
                  <TrackCard
                    key={`${trackColor}-${idx}`}
                    color={trackColor}
                    style={{ width: "5rem", cursor: "pointer" }}
                    raised={chosenTrackCards.hasOwnProperty(idx)}
                    interactable={true}
                  />
                </TrackCardWrapper>
              );
            })}
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ alignSelf: "center" }}
            onClick={handleBuildRoute}
            disabled={!isChosenCardsEnough}
          >
            <Typography
              variant="h6"
              style={{
                filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
              }}
            >
              Build route ({Object.keys(chosenTrackCards).length}/
              {chosenRoute.length})
            </Typography>
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};
export default TrackCardModal;
