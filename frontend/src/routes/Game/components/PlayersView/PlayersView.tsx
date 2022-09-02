import React, { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Typography, Divider, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { PlayerClient } from "@typeDef/types";
import PlayerCard from "./PlayerCard";

const OpponentsViewWrapper = styled(motion.div)`
  /* grid-area: opponents; */
  /* height: 10vh; */
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.7rem;
  z-index: 1000;
  max-width: 100vw;
  /* overflow: auto; */
`;

const Scrollable = styled.div`
  grid-area: trackCards;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  max-width: calc(100vw - 18rem);
  overflow: auto;
  padding-right: 1rem;
`;

const OpponentsView: FC = () => {
  const { playerId, players } = useSelector((state: RootState) => state.game);
  const [myInformation, setMyInformation] = useState<PlayerClient>();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const ScrollableOrNot = isExpanded ? Scrollable : Fragment;

  useEffect(() => {
    const me = players.find((player) => player.playerId === playerId);
    setMyInformation(me);
  }, [players]);

  return (
    <OpponentsViewWrapper>
      {myInformation ? <PlayerCard player={myInformation} isMe /> : null}
      <motion.div
        variants={{
          expanded: {
            width: "fit-content",
            x: 0,
            opacity: 1,
            display: "flex",
          },
          notExpanded: {
            width: 0,
            x: 50,
            opacity: 0,
            display: "flex",
            transitionEnd: {
              display: "none",
            },
          },
        }}
        initial={false}
        animate={isExpanded ? "expanded" : "notExpanded"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Divider
          orientation="vertical"
          flexItem
          style={{ margin: "10px 1.5rem", width: "2px" }}
        />
        <ScrollableOrNot>
          {players && players.length > 1 ? (
            players
              .filter((player) => player.playerId !== playerId)
              .map((opponent) => (
                <PlayerCard key={opponent.playerId} player={opponent} />
              ))
          ) : (
            <Typography
              style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}
              variant="body1"
            >
              No opponents
            </Typography>
          )}
        </ScrollableOrNot>
      </motion.div>
      <IconButton
        aria-label={isExpanded ? "Shrink menu" : "Expand menu"}
        // style={{ fontSize: "2rem" }}
        style={{
          backgroundColor: "#fff",
          marginLeft: "1rem",
          filter: "drop-shadow(0 0 4px rgba(50, 50, 50, 0.3))",
        }}
        color="secondary"
        size="small"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </OpponentsViewWrapper>
  );
};

export default OpponentsView;
