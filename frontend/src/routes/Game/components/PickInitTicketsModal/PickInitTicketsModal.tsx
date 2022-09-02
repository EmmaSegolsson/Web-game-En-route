import React, { FC, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import styled from "styled-components";
import {
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { SocketEvent, Ticket } from "@typeDef/types";
import { socketContext } from "context/socket";
import TicketCard from "../TicketCard";
import { motion } from "framer-motion";
import socketEmit from "utils/socketEmit";

const ModalWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 4px solid #f9b1cd;
  padding: 10px;
  max-width: 690px;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const PickInitTicketsModal: FC = () => {
  const socket = useContext(socketContext);
  const { tickets } = useSelector((state: RootState) => state.game);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isEnoughCards, setIsEnoughCards] = useState<boolean>(false);
  const [chosenTickets, setChosenTickets] = useState<Ticket[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (chosenTickets.length >= 2) {
      setIsEnoughCards(true);
    } else {
      setIsEnoughCards(false);
    }
  }, [chosenTickets]);

  const isChosen = (ticket: Ticket) => chosenTickets.includes(ticket);

  const markTicket = (ticket: Ticket) => {
    if (!chosenTickets.includes(ticket)) {
      const newTickets = [...chosenTickets, ticket];
      setChosenTickets(newTickets);
    } else {
      const filtered = chosenTickets.filter((t) => t !== ticket);
      setChosenTickets(filtered);
    }
  };

  const chooseTickets = () => {
    if (chosenTickets.length >= 2 && socket) {
      socketEmit(socket, "pick_initial_tickets", chosenTickets);
      setIsModalOpen(false);
    } else {
      // TODO: Change to enqueueSnackbar?
      console.log("You must choose at least 2 cards to keep!");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: {
          transition: "background-color 300ms ease",
          backgroundColor: isMinimized
            ? "rgba(50,50,50,0.25)"
            : "rgba(50,50,50,0.8)",
        },
      }}
      disableBackdropClick
      disableEscapeKeyDown
      onBackdropClick={() => {
        if (isMinimized) {
          setIsMinimized(false);
        }
      }}
    >
      <Fade in={isModalOpen}>
        <ModalWrapper
          initial={false}
          animate={isMinimized ? "minimized" : "maximized"}
          variants={{
            minimized: {
              y: window.innerHeight * 0.45,
              borderRadius: "50%",
            },
            maximized: {
              y: 0,
              borderRadius: "4px",
            },
          }}
          transition={{
            mass: 10,
          }}
        >
          <IconButton
            aria-label={isMinimized ? "Maximize" : "Minimize"}
            style={
              isMinimized
                ? {
                    margin: 0,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: "#fff",
                    filter: "drop-shadow(0 0 1px rgba(50, 50, 50, 0.2))",
                  }
            }
            color="secondary"
            size="small"
            onClick={() => {
              setIsMinimized(!isMinimized);
            }}
          >
            {isMinimized ? <AddIcon /> : <RemoveIcon />}
          </IconButton>

          <ContentWrapper
            initial={true}
            variants={{
              minimized: {
                opacity: 0,
                scale: 0,
                height: 0,
                width: 0,
              },
              maximized: {
                opacity: 1,
                scale: 1,
                height: "fit-content",
                width: "fit-content",
              },
            }}
            transition={{
              mass: 10,
            }}
          >
            <Typography
              variant="h3"
              style={{
                margin: "10px",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Choose at least two tickets to keep
            </Typography>

            <CardsWrapper>
              {tickets && tickets.length
                ? tickets.map((ticket) => {
                    return (
                      <div
                        key={`${ticket.start}_${ticket.end}`}
                        style={{ padding: "10px" }}
                        onClick={() => markTicket(ticket)}
                      >
                        <TicketCard
                          style={{ width: "15rem", cursor: "pointer" }}
                          ticket={ticket}
                          raised={isChosen(ticket)}
                          interactable
                        />
                      </div>
                    );
                  })
                : "No tickets"}
            </CardsWrapper>

            <Button
              variant="contained"
              color="secondary"
              style={{ maxWidth: "210px", alignSelf: "center" }}
              onClick={chooseTickets}
              disabled={!isEnoughCards}
            >
              <Typography
                variant="h6"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
                }}
              >
                Choose tickets
              </Typography>
            </Button>
          </ContentWrapper>
        </ModalWrapper>
      </Fade>
    </Modal>
  );
};

export default PickInitTicketsModal;
