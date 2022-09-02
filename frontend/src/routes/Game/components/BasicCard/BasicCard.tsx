import { motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";

const HEIGHT = 256.12;
const WIDTH = 171.08;

type BasicCardWrapperProps = {
  rotate?: boolean;
  raised?: boolean;
  hoverable?: boolean;
};
const BasicCardWrapper = styled(motion.div)<BasicCardWrapperProps>`
  background-color: #fff;
  width: 100%;
  padding-top: ${({ rotate }) =>
    (rotate ? WIDTH / HEIGHT : HEIGHT / WIDTH) * 100}%;
  position: relative;
  box-shadow: 0 0 8px ${({ raised }) => (raised ? 2 : 0)}px
    rgba(50, 50, 50, 0.2);
  transition: all 100ms ease;
  border-radius: 0.3rem;

  ${({ hoverable }) =>
    hoverable
      ? `
    cursor: pointer;
    filter: brightness(1);
    transition: filter 200ms ease;

    :hover {
      filter: brightness(0.9);
    }
  `
      : ""}
`;

const BasicCardContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type BasicCardProps = {
  rotate: boolean;
  style: React.CSSProperties;
  raised?: boolean;
  interactable?: boolean;
  hoverable?: boolean;
};
const BasicCard: FC<BasicCardProps> = ({
  children,
  style,
  rotate = false,
  raised = false,
  interactable = false,
  hoverable = false,
}) => {
  return (
    <BasicCardWrapper
      style={style}
      rotate={rotate}
      raised={raised}
      hoverable={hoverable}
      initial={false}
      animate={raised ? "isRaised" : interactable ? "isNotRaised" : "initial"}
      variants={{
        isRaised: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.1 },
        },
        isNotRaised: {
          scale: 0.93,
          opacity: 0.5,
          transition: { duration: 0.1 },
        },
        initial: {
          scale: 1,
          opacity: 1,
        },
      }}
      whileHover={
        interactable && !raised
          ? { opacity: 0.7, transition: { duration: 0 } }
          : {}
      }
      whileTap={interactable ? { scale: 0.85 } : {}}
    >
      <BasicCardContent>{children}</BasicCardContent>
    </BasicCardWrapper>
  );
};

export default BasicCard;
