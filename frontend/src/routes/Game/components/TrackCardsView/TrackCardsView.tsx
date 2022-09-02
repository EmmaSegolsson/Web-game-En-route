import React, { FC, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import {
  Badge,
  ClickAwayListener,
  IconButton,
  withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styled from "styled-components";
import { motion } from "framer-motion";

import TicketsModal from "../TicketsModal";
import TrackCard from "../TrackCard";
import TicketBack from "../TicketCard/TicketBack";

const TrackCardsViewWrapper = styled(motion.div)`
  /* grid-area: trackCards; */
  position: fixed;
  bottom: 0;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  padding: 0.1rem;
  z-index: 1000;
`;

const Scrollable = styled.div`
  grid-area: trackCards;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  padding: 0.4rem;
  /* width: 100%; */
  max-width: calc(100vw - 2.4rem);
  /* background-color: #94d9db; */
  overflow: auto;
`;

const StyledBadge = withStyles({
  root: {
    marginBottom: "0.3em",
    padding: "0.3rem",
    paddingLeft: "1rem",
  },
  badge: {
    transform: "translateX(20%) translateY(-10%)",
  },
})(Badge);

const TrackCardsView: FC = () => {
  const { trackCards, tickets } = useSelector((state: RootState) => state.game);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const openTicketsModal = () => {
    setIsTicketsModalOpen(true);
  };

  const ScrollableOrNot = isExpanded ? Scrollable : Fragment;

  return (
    <>
      <TicketsModal modalState={[isTicketsModalOpen, setIsTicketsModalOpen]} />
      {/* <ClickAwayListener
        onClickAway={() => {
          setIsExpanded(false);
        }}
      > */}
      <TrackCardsViewWrapper
        variants={{
          expanded: {
            translateX: 0,
          },
          notExpanded: {
            translateX: "calc(-100% + 7.6rem)",
          },
        }}
        initial={false}
        animate={isExpanded ? "expanded" : "notExpanded"}
      >
        <ScrollableOrNot>
          {Object.values(trackCards).map((trackCard) => {
            return (
              trackCard.amount > 0 && (
                <StyledBadge
                  badgeContent={trackCard.amount}
                  color="primary"
                  key={`trackColor_${trackCard.color}`}
                >
                  <TrackCard
                    color={trackCard.color}
                    style={{ width: "5rem" }}
                  />
                </StyledBadge>
              )
            );
          })}
          <StyledBadge badgeContent={tickets.length} color="primary">
            <div onClick={openTicketsModal}>
              <TicketBack style={{ width: "5rem" }} />
            </div>
          </StyledBadge>
        </ScrollableOrNot>

        <IconButton
          aria-label={isExpanded ? "Shrink menu" : "Expand menu"}
          // style={{ fontSize: "2rem" }}
          style={{
            backgroundColor: "#fff",
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
      </TrackCardsViewWrapper>
      {/* </ClickAwayListener> */}
    </>
  );
};

export default TrackCardsView;
