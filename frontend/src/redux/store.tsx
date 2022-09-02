import { FC } from "react";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import gameReducer from "./game";
import chosenRouteReducer from "./chosenRoute";

import { GameState } from "./types";
import { GameRoute } from "@typeDef/types";

// COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  game: gameReducer,
  chosenRoute: chosenRouteReducer,
  // OTHER REDUCERS WILL BE ADDED HERE
});

type CombinedReducerType = ReturnType<typeof combinedReducer>;
export interface RootState extends CombinedReducerType {
  game: GameState;
}

// BINDING MIDDLEWARE
const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const useRedux = () => {
  const persistConfig = {
    key: "EnRoute",
    whitelist: ["test"], // only these will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

  const store = createStore(
    persistedReducer,
    bindMiddleware([thunkMiddleware]),
  ); // Creating the store again

  const persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

  return { store, persistor };
};

const StoreWithProvider: FC = ({ children }) => {
  const { store, persistor } = useRedux();

  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreWithProvider;
