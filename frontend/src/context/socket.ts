import { createContext } from "react";
import socketio from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://enroute.vlq.se"
    : "http://localhost:3001";

export const _DO_NOT_USE_socket = socketio(SOCKET_URL);
export const socketContext = createContext(_DO_NOT_USE_socket);
