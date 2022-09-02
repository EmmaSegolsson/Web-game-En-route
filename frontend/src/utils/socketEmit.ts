import { Socket } from "socket.io-client";

import { SocketEvent } from "@typeDef/types";

const socketEmit = (socket: Socket, event: SocketEvent, message?: any) => {
  socket.emit(event, message);
};

export default socketEmit;
