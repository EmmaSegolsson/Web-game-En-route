import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useGesture } from "react-use-gesture";

import OpenTrackCardsView from "../OpenTrackCardsView";
import Map from "../Map";

const GameBoardWrapper = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1;
`;

const GameBoardTable = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  cursor: grab;
  touch-action: none;
`;

const GameBoard: FC = () => {
  const gameBoardTableRef = useRef<any>();

  const [maxX, setMaxX] = useState<number>(window.innerWidth * 0.1);
  const [maxY, setMaxY] = useState<number>(window.innerHeight * 0.1);

  const maxScale = 1.7;
  const minScale = 0.9;
  const scale = useMotionValue(0.9);

  useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        const newScale = 1 + d / 500;

        if (newScale <= maxScale && newScale >= minScale) {
          scale.set(1 + d / 500);
          setMaxX(window.innerWidth * newScale * 0.3);
          setMaxY(window.innerHeight * newScale * 0.3);
        } else if (newScale > maxScale) {
          scale.set(maxScale);
          setMaxX(window.innerWidth * maxScale * 0.3);
          setMaxY(window.innerHeight * maxScale * 0.3);
        } else {
          scale.set(minScale);
          setMaxX(window.innerWidth * minScale * 0.3);
          setMaxY(window.innerHeight * minScale * 0.3);
        }
      },
    },
    {
      domTarget: gameBoardTableRef,
      eventOptions: { passive: false },
    },
  );

  return (
    <GameBoardWrapper>
      <GameBoardTable
        drag
        dragMomentum={false}
        dragConstraints={{ left: -maxX, right: maxX, top: -maxY, bottom: maxY }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
        style={{ scale }}
        ref={gameBoardTableRef}
      >
        <Map />
        <OpenTrackCardsView />
      </GameBoardTable>
    </GameBoardWrapper>
  );
};

export default GameBoard;
