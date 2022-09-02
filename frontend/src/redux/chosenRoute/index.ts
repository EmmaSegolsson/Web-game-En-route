import { Dispatch } from "redux";
import { ChosenRouteState } from "redux/types";

export const chosenRouteActions = {
  SET_CHOSEN_ROUTE: "setChosenRoute",
  UNSET_CHOSEN_ROUTE: "unsetChosenRoute",
};

const initialState: ChosenRouteState = {};

export const setChosenRoute = (newState: ChosenRouteState) => (
  dispatch: Dispatch,
) => {
  return dispatch({
    type: chosenRouteActions.SET_CHOSEN_ROUTE,
    payload: newState,
  });
};

export const unsetChosenRoute = () => (dispatch: Dispatch) => {
  return dispatch({
    type: chosenRouteActions.UNSET_CHOSEN_ROUTE,
  });
};

const chosenRouteReducer = (
  state = initialState,
  action: any,
): ChosenRouteState => {
  switch (action.type) {
    case chosenRouteActions.SET_CHOSEN_ROUTE:
      return action.payload;
    case chosenRouteActions.UNSET_CHOSEN_ROUTE:
      return initialState;
    default:
      return state;
  }
};

export default chosenRouteReducer;
