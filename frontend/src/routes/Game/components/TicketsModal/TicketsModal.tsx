import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Button, Typography, Modal, Backdrop, Fade } from "@material-ui/core";
import styled from "styled-components";

import TicketCard from "../TicketCard";

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 4px solid #f9b1cd;
  border-radius: 4px;
  padding: 10px;
  max-width: 690px;
`;

type TicketsModalProp = {
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const TicketsModal: FC<TicketsModalProp> = ({
  modalState: [isModalOpen, setIsModalOpen],
}) => {
  const { tickets } = useSelector((state: RootState) => state.game);

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
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isModalOpen}>
        <ContentWrapper>
          <Typography
            variant="h3"
            style={{ margin: "10px", textAlign: "center" }}
          >
            Destination Tickets
          </Typography>

          <CardsWrapper>
            {tickets && tickets.length
              ? tickets.map((ticket) => {
                  return (
                    <div
                      key={`${ticket.start}_${ticket.end}`}
                      style={{ padding: "10px" }}
                    >
                      <TicketCard style={{ width: "15rem" }} ticket={ticket} />
                    </div>
                  );
                })
              : "No tickets"}
          </CardsWrapper>
          <Button
            variant="contained"
            color="secondary"
            style={{ maxWidth: "200px", alignSelf: "center" }}
            onClick={() => setIsModalOpen(false)}
          >
            <Typography
              variant="h6"
              style={{
                filter: "drop-shadow(0 0 2px rgba(50, 50, 50, 0.3))",
              }}
            >
              Close
            </Typography>
          </Button>
        </ContentWrapper>
      </Fade>
    </Modal>
  );
};

export default TicketsModal;
