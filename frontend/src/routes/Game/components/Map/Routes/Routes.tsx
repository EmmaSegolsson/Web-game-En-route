import { FC, forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { colorToHex, playerColorToHex } from "utils/constants";
import routesInfo, { RouteInfo } from "./routesInfo";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RootState } from "redux/store";
import { setChosenRoute } from "redux/chosenRoute";
import { PlayerColor, Route as RouteType, TrackColor } from "@typeDef/types";

const TrackRect = styled(motion.rect)`
  stroke-miterlimit: 10;
`;

const RailRect = styled(motion.rect)`
  stroke-miterlimit: 10;
`;

const BridgeSvg = styled(motion.path)`
  fill: #262626;
`;
type BridgeProps = {
  d: string;
};
const Bridge: FC<BridgeProps> = ({ d }) => (
  <BridgeSvg d={d} transform="translate(0)" />
);

type TrackGroupProps = {
  canBuild: boolean;
};
const TrackGroup = styled(motion.g)<TrackGroupProps>`
  filter: brightness(1) opacity(0.9);
  transition: filter 150ms ease;

  ${({ canBuild }) =>
    canBuild
      ? `
    cursor: pointer;

    &:hover {
      filter: brightness(0.9) opacity(1);
    }
  `
      : `
    cursor: not-allowed;
  `}
`;

type RouteProps = {
  id: RouteType;
  routeInfo: RouteInfo;
};
const Route = forwardRef<any, RouteProps>(({ id, routeInfo }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { routes, trackCards, currentPlayer, playerId } = useSelector(
    (state: RootState) => state.game,
  );
  const color = colorToHex[routeInfo.color];
  const { emptyTracks, builtTracks, bridges } = routeInfo;

  const [builtBy, setBuiltBy] = useState<PlayerColor | null>(null);
  const [canBuild, setCanBuild] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const builtTracksWrapperVariants = {
    isBuilt: {
      transition: {
        staggerChildren: emptyTracks.length > 1 ? 0.2 : 0.03,
        delayChildren: emptyTracks.length > 1 ? 0.2 : 0.01,
      },
    },
    isNotBuilt: {
      transition: { staggerChildren: 0.15, staggerDirection: -1 },
    },
  };

  const builtTracksGroupVariants = {
    isBuilt: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01,
      },
    },
    isNotBuilt: {
      transition: {
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    },
  };

  const builtTracksVariants = {
    isBuilt: {
      opacity: 1,
      // scale: 1,
    },
    isNotBuilt: {
      opacity: 0,
      // scale: 0,
    },
  };

  const handleClick = () => {
    if (canBuild) {
      dispatch(
        setChosenRoute({
          id,
          builtBy: null,
          color: routeInfo.color,
          bridges: routes[id].bridges,
          length: routes[id].length,
        }),
      );
    } else {
      // console.log(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  useEffect(() => {
    if (routes && routes[id]) {
      setBuiltBy(routes[id].builtBy);
    }
  }, [routes]);

  useEffect(() => {
    try {
      if (currentPlayer !== playerId) {
        throw new Error("not_your_turn");
      }

      if (!trackCards || !routes || !routes[id]) throw new Error("");

      if (routes[id].builtBy !== null) {
        throw new Error("already_built");
      }

      const amountBridges = trackCards["bridge"].amount;

      if (amountBridges < routes[id].bridges) {
        throw new Error("not_enough_bridges");
      }

      const noBridges = Object.values(trackCards).filter(
        ({ color }) => color !== "bridge",
      );

      if (
        (routes[id].color === "any" &&
          !noBridges.some(
            (trackCard) =>
              trackCard.amount + amountBridges >= routes[id].length,
          )) ||
        (routes[id].color !== "any" &&
          trackCards[routes[id].color as TrackColor].amount + amountBridges <
            routes[id].length)
      ) {
        throw new Error("not_enough_track_cards");
      }

      setCanBuild(true);
    } catch (error) {
      setCanBuild(false);

      switch (error.message) {
        case "not_your_turn":
          setErrorMessage(`It's not your turn`);
          break;
        case "already_built":
          setErrorMessage(
            `That route is already built by ${routes[id].builtBy}`,
          );
          break;
        case "not_enough_track_cards":
          setErrorMessage(
            `You don't have enough track cards to build that route`,
          );
          break;
        case "not_enough_bridges":
          setErrorMessage(
            `You don't have enough bridge cards to build that route`,
          );
          break;
        default:
          setErrorMessage(`Cannot build that route`);
          break;
      }
    }
  }, [trackCards, currentPlayer, playerId]);

  return (
    <motion.g initial={false} animate={builtBy ? "isBuilt" : "isNotBuilt"}>
      <AnimatePresence>
        {builtBy ? (
          <motion.g
            variants={builtTracksWrapperVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {builtTracks.map((builtTracks, i) => (
              <motion.g
                variants={builtTracksGroupVariants}
                key={`builtTrack-${i}`}
              >
                {builtTracks.map((builtTrack) => (
                  <RailRect
                    key={`builtTrack-${i}-${builtTrack.x}-${builtTrack.y}`}
                    {...builtTrack}
                    fill={playerColorToHex[builtBy]}
                    variants={builtTracksVariants}
                  />
                ))}
              </motion.g>
            ))}
          </motion.g>
        ) : (
          <TrackGroup
            canBuild={canBuild}
            ref={ref}
            id={id}
            onClick={() => {
              handleClick();
            }}
            whileHover={canBuild ? { scale: 1.08 } : {}}
            whileTap={canBuild ? { scale: 0.95 } : {}}
          >
            {emptyTracks.map((emptyTrack) => (
              <TrackRect
                {...emptyTrack}
                key={`emptyTrack-${emptyTrack.x}-${emptyTrack.y}`}
                fill={color[0]}
                stroke={color[1]}
              />
            ))}
            {bridges.map((d, i) => (
              <Bridge d={d} key={`bridge-${i}`} />
            ))}
          </TrackGroup>
        )}
      </AnimatePresence>
    </motion.g>
  );
});

const Routes: FC = () => {
  return (
    <motion.g id="tracks">
      {Object.entries(routesInfo).map(([id, routeInfo]) => (
        <Route key={`route-${id}`} id={id as RouteType} routeInfo={routeInfo} />
      ))}
    </motion.g>
  );
};

export default Routes;
