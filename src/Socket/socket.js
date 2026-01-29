import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
//socket.auth = { token: localStorage.getItem("accessToken") };
//socket.connect();