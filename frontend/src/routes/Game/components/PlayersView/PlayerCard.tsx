import React, { FC } from "react";
import {
  Badge,
  styled as muiStyled,
  Typography,
  withStyles,
} from "@material-ui/core";
import { motion } from "framer-motion";
import styled from "styled-components";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useSelector } from "react-redux";

import { PlayerClient } from "@typeDef/types";

import RailIcon from "utils/RailIcon";
import { playerColorToHex } from "utils/constants";
import { RootState } from "redux/store";

const PlayerCardWrapper = styled(motion.div)`
  position: relative;
  padding: 0.3rem;
  margin: 0.4rem 1rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Lower = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 2;
  margin: 0.2rem 0.9rem 0 0;
`;

const TrackBadge = withStyles({
  badge: {
    fontSize: ".75rem",
    height: "1.65rem",
    minWidth: "1.65rem",
    padding: 0,
    transform: "translateX(45%) translateY(-15%)",
  },
})(Badge);

const PlayerAvatar = muiStyled(PersonOutlineIcon)({
  fontSize: "4rem",
  alignSelf: "center",
  marginBottom: "0.3rem",
});

const CurrentPlayerBadgeText = styled(motion.div)`
  font-size: 0.7rem;
  text-align: center;
  background-color: #f9b1cd;
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 0.3rem;
  position: absolute;
  bottom: -0.3rem;
  right: -2rem;
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 2;
  margin-left: 0.5rem;
`;

const TrackStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

type PlayerCardProps = {
  player: PlayerClient;
  isMe?: boolean;
};
const PlayerCard: FC<PlayerCardProps> = ({ player, isMe = false }) => {
  const { currentPlayer } = useSelector((state: RootState) => state.game);

  return (
    <PlayerCardWrapper
      key={player.playerId}
      variants={{
        active: {
          scale: 1,
          filter: `drop-shadow(0 0 0.2rem rgb(169,169,169))`,
          backgroundColor: "rgba(255, 255, 255, 1)",

          transition: {
            duration: 0.2,
          },
        },
        inactive: {
          scale: 0.9,
          filter: `drop-shadow(0 0 0 rgba(0,0,0,0))`,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          transition: {
            duration: 0.2,
          },
        },
      }}
      animate={
        currentPlayer === player.playerId || isMe ? "active" : "inactive"
      }
    >
      {currentPlayer === player.playerId && (
        <CurrentPlayerBadgeText
          variants={{
            pulse: {
              scale: [1, 1.05, 1, 1.05, 1],

              transition: {
                duration: 1.5,
                delay: 1,
                repeat: 2,
                times: [0, 0.2, 0.4, 0.6, 1],
              },
            },
            noPulse: {
              scale: 1,
            },
          }}
          animate={currentPlayer === player.playerId ? "pulse" : "noPulse"}
        >
          {isMe ? "Your turn" : "Current player"}
        </CurrentPlayerBadgeText>
      )}
      {isMe && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-30%, -30%)",
            padding: "0.5rem",
            borderRadius: "10%",
            backgroundColor: "#f9b1cd",
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              color: "#fff",
              filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.4))",
            }}
          >
            You
          </span>
        </div>
      )}

      <Typography
        variant="h5"
        style={{ textAlign: "center", fontWeight: "bolder" }}
      >
        {player.nickname}
      </Typography>

      <Lower>
        <PlayerAvatar
          style={{
            color: playerColorToHex[player.color],
          }}
        />
        <PlayerInfo>
          <TrackStats>
            <TrackBadge badgeContent={player.remainingTracks} color="primary">
              <RailIcon
                color={playerColorToHex[player.color]}
                style={{
                  fontSize: "2.5rem",
                }}
              />
            </TrackBadge>
          </TrackStats>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {player.points}p
          </Typography>
        </PlayerInfo>
      </Lower>
    </PlayerCardWrapper>
  );
};

export default PlayerCard;
