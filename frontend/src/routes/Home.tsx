import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { setInitGame } from "../redux/game";
import useAxios from "../hooks/useAxios";

/*=============== Types ===============*/
import { SocketResponse, CreateJoinSocketPayload } from "@typeDef/types";
import { RootState } from "redux/store";
import Pin from "assets/Pin";
/*=====================================*/

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const axios = useAxios();
  const { enqueueSnackbar } = useSnackbar();
  const { gameToken: gameTokenRedux } = useSelector(
    (state: RootState) => state.game,
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [gameToken, setGameToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error", autoHideDuration: 2000 });
      setError("");
    }
  }, [error]);

  useEffect(() => {
    if (gameTokenRedux) {
      history.push("/game");
    }
  }, [gameTokenRedux]);

  const handleCreateGame = async () => {
    try {
      const resp = await axios.post<SocketResponse<CreateJoinSocketPayload>>(
        "/game",
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
      setError("Could not create game");
      // TODO: Fix error handling
      // switch (err.code) { DOES NOT WORK
      //   case "create_game/not_created":
      //     console.log(err.message);
      //     break;
      //   default:
      //     break;
      // }
    }
  };

  //TODO: Add functionality to join a game (check if game code exits and if there is enough room)
  const handleJoinGame = async (e: any) => {
    e.preventDefault();
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
      setError("Could not join game");
      // TODO: Fix error handling
      // switch (err.code) { DOES NOT WORK
      //   case "join_game/not_joined":
      //     setError("Could not join game");
      //     console.log(err.message);
      //     break;
      //   case "join_game/not_found":
      //     setError("Could not find the game");
      //     break;
      //   default:
      //     break;
      // }
    }
  };

  return (
    <Container>
      <Pin animate style={{ width: "25rem" }} />
      <Typography variant="h2">EN ROUTE</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateGame}>
        <Typography
          variant="h6"
          style={{ filter: "drop-shadow(0 0 5px rgba(50, 50, 50, 0.3))" }}
        >
          Create game
        </Typography>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsModalOpen(true)}
      >
        <Typography variant="h6">Join game</Typography>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isModalOpen}>
          <div
            style={{
              backgroundColor: "white",
              border: "4px solid #f9b1cd",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            <form onSubmit={handleJoinGame}>
              <Typography variant="h3" style={{ margin: "10px" }}>
                Enter game code:
              </Typography>

              <FormControl variant="outlined">
                <InputLabel htmlFor="game_code">Game code</InputLabel>
                <OutlinedInput
                  id="game_code"
                  type={"text"}
                  // value={gameToken}
                  onChange={(e) => setGameToken(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleJoinGame}
                        edge="end"
                        type="submit"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Home;
