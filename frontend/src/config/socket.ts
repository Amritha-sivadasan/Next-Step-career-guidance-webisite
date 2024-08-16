// src/socket.js
import { io } from "socket.io-client";

// Replace with your backend server URL
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
