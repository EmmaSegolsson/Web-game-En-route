import { TrackColor } from "@typeDef/types";

type InitialTrackCards = {
  [color in TrackColor]: {
    color: TrackColor;
    amount: number;
  };
};
// TODO: Change back amount to zero
const initialTrackCards: InitialTrackCards = {
  blue: {
    color: "blue",
    amount: 0,
  },
  orange: {
    color: "orange",
    amount: 0,
  },
  red: {
    color: "red",
    amount: 0,
  },
  black: {
    color: "black",
    amount: 0,
  },
  white: {
    color: "white",
    amount: 0,
  },
  green: {
    color: "green",
    amount: 0,
  },
  yellow: {
    color: "yellow",
    amount: 0,
  },
  pink: {
    color: "pink",
    amount: 0,
  },
  bridge: {
    color: "bridge",
    amount: 0,
  },
};

export default initialTrackCards;
