import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import styled from "styled-components";

import logo from "assets/location.gif";

import { CreateJoinSocketPayload, SocketResponse } from "@typeDef/types";
import { setInitGame } from "redux/game";
import useAxios from "hooks/useAxios";
import { Typography } from "@material-ui/core";

const JoinFromInviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
`;

type JoinFromInviteParams = {
  gameToken: string;
};

const JoinFromInvite: FC = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { gameToken } = useParams<JoinFromInviteParams>();

  const handleJoinGame = async () => {
    try {
      const resp = await axios.patch<SocketResponse<CreateJoinSocketPayload>>(
        "/game",
        { gameToken: `game#${gameToken}` },
      );
      dispatch(
        setInitGame({
          gameToken: resp.data.payload.gameToken,
          playerId: resp.data.payload.player.playerId,
          color: resp.data.payload.player.color,
          nickname: resp.data.payload.player.nickname,
          remainingTracks: resp.data.payload.player.remainingTracks,
        }),
      );
      history.push("/game");
    } catch (err) {
      enqueueSnackbar("Could not join game", {
        variant: "error",
        autoHideDuration: 2000,
      });
      history.push("/");
    }
  };

  useEffect(() => {
    handleJoinGame();
  }, []);

  return (
    <JoinFromInviteWrapper>
      <img src={logo} style={{ height: "15rem" }} alt="logo" />
      <Typography
        variant="h1"
        style={{ fontSize: "3.5rem", fontWeight: "bold", color: "#f9b1cd" }}
      >
        Joining game {gameToken}
      </Typography>
    </JoinFromInviteWrapper>
  );
};

export default JoinFromInvite;
