import { FC } from "react";
import { motion } from "framer-motion";

import Background from "./Background";
import Cities from "./Cities";
import Routes from "./Routes";
import styled from "styled-components";

const MapWrapper = styled(motion.svg)`
  /* grid-area: map; */
  width: 90%;
  border-radius: 0.5rem;
  border: 3px solid #db93a5;
  overflow: hidden;
  filter: drop-shadow(0 0 1rem rgba(50, 50, 50, 0.3));
  /* height: 100%; */
`;

const Map: FC = () => {
  return (
    <MapWrapper
      // width="100%"
      // height="100%"
      id="game_map"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1921 1049"
      initial={{ clipPath: "circle(1px at 50% 50%)" }}
      animate={{
        clipPath: "circle(100% at 50% 50%)",
        transition: {
          duration: 1,
        },
      }}
    >
      <Background />
      <Cities />
      <Routes />
    </MapWrapper>
  );
};

export default Map;
