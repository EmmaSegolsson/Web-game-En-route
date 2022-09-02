import { TrackColor } from "@typeDef/types";

type MapTrackColorToHex = {
  [color in TrackColor]: {
    bg1: {
      fill: string;
    };
    bg2: {
      fill: string;
      stroke: string;
    };
    bg3: {
      fill: string;
      stroke: string;
    };
    circle: {
      fill: string;
      stroke: string;
    };
    rail: {
      fill: string;
    };
  };
};
const mapTrackColorToHex: MapTrackColorToHex = {
  blue: {
    bg1: {
      fill: "#9ab4d9",
    },
    bg2: {
      fill: "#cfc0d5",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#9ab4d9",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#cad6e7",
      stroke: "#fff",
    },
    rail: {
      fill: "#7c9bc0",
    },
  },
  orange: {
    bg1: {
      fill: "#f8be64",
    },
    bg2: {
      fill: "#fae69a",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#f8be64",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#f8daae",
      stroke: "#fff",
    },
    rail: {
      fill: "#e3a640",
    },
  },
  red: {
    bg1: {
      fill: "#f08579",
    },
    bg2: {
      fill: "#f8be64",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#f08579",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#fde9e4",
      stroke: "#f7f6f8",
    },
    rail: {
      fill: "#df857b",
    },
  },
  black: {
    bg1: {
      fill: "#28636c",
    },
    bg2: {
      fill: "#c6897f",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#28636c",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#d2d3dc",
      stroke: "#f7f6f8",
    },
    rail: {
      fill: "#00454c",
    },
  },
  white: {
    bg1: {
      fill: "#e5e5e7",
      //   stroke: "fefdfe",    // TODO: Add stroke to all?
    },
    bg2: {
      fill: "#9ab5d7",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#e5e5e8",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#ccc9ca",
      stroke: "#f6f6f6",
    },
    rail: {
      fill: "#f6f6f6",
    },
  },
  green: {
    bg1: {
      fill: "#b9d4b8",
    },
    bg2: {
      fill: "#d8d2db",
      stroke: "#fff",
    },
    bg3: {
      fill: "#cee2d7",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#f1f5f3",
      stroke: "#fff",
    },
    rail: {
      fill: "#b3cbbf",
    },
  },
  yellow: {
    bg1: {
      fill: "#fae69a",
    },
    bg2: {
      fill: "#e5e5e8",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#fae69a",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#fefaed",
      stroke: "#fff",
    },
    rail: {
      fill: "#e8cf7d",
    },
  },
  pink: {
    bg1: {
      fill: "#f1c5d6",
    },
    bg2: {
      fill: "#cee2d7",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "#f1c5d6",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "#faf0f4",
      stroke: "#fff",
    },
    rail: {
      fill: "#dfacb8",
    },
  },
  bridge: {
    bg1: {
      fill: "url(#linear-gradient)",
    },
    bg2: {
      fill: "#fde9e4",
      stroke: "#f7f6f8",
    },
    bg3: {
      fill: "url(#linear-gradient-2)",
      stroke: "#f7f6f8",
    },
    circle: {
      fill: "url(#linear-gradient-3)",
      stroke: "#fff",
    },
    rail: {
      fill: "bridge",
    },
  },
};

export default mapTrackColorToHex;
