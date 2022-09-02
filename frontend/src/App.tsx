import React, { FC, useEffect } from "react";
import StoreWithProvider from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import "./index.css";

import Home from "./routes/Home";
import GameRoute from "./routes/Game";
import JoinFromInvite from "./routes/JoinFromInvite";

/*=====================================*/

const theme = createMuiTheme({
  shape: {
    borderRadius: 3,
  },
  palette: {
    primary: {
      main: "#fde77d",
    },
    secondary: {
      main: "#f9b1cd",
    },
    error: {
      main: "#ff0000",
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
        border: "4px solid",
        margin: "10px",
        color: "white",
        "& > .MuiButton-label": {
          color: "white",
        },
      },
      containedPrimary: {
        borderColor: "#dfc95f",
      },
      containedSecondary: {
        borderColor: "#db93a5",
      },
      root: {
        "&$disabled": {
          borderColor: "#a6a6a6",
        },
      },
    },
    MuiTypography: {
      h1: {
        fontFamily: "Amatic SC",
        fontWeight: "bold",
        color: "rgb(88, 88, 88)",
      },
      h2: {
        fontFamily: "Amatic SC",
        color: "rgb(88, 88, 88)",
      },
      h3: {
        fontFamily: "Amatic SC",
        color: "rgb(88, 88, 88)",
      },
      h5: {
        fontWeight: "normal",
        fontSize: "1rem",
        color: "rgb(88, 88, 88)",
      },
      h6: {
        fontWeight: "normal",
        fontSize: "1rem",
        color: "white",
      },
      body1: {
        color: "rgb(88, 88, 88)",
        fontSize: "0.8rem",
      },
    },
    MuiBadge: {
      badge: {
        fontSize: "1.25rem",
        height: "2rem",
        minWidth: "2rem",
        borderRadius: "50%",
      },
    },
  },
});

const App: FC = () => {
  const preventPinch = (e: any) => {
    e.preventDefault();
  };

  const touchHandler = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", touchHandler, { passive: false });
    document.addEventListener("gesturestart", preventPinch);
    document.addEventListener("gesturechange", preventPinch);
    document.addEventListener("gestureend", preventPinch);

    return () => {
      document.removeEventListener("wheel", touchHandler);
      document.removeEventListener("gesturestart", preventPinch);
      document.removeEventListener("gesturechange", preventPinch);
      document.removeEventListener("gestureend", preventPinch);
    };
  }, [document]);

  return (
    <StoreWithProvider>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path={"/"} exact render={() => <Home />} />
              <Route path={"/game"} exact render={() => <GameRoute />} />
              <Route
                path={"/game/:gameToken"}
                render={() => <JoinFromInvite />}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </StoreWithProvider>
  );
};

export default App;
