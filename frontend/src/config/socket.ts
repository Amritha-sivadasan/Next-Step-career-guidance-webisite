// src/socket.js
import { io } from "socket.io-client";

// Replace with your backend server URL
const API_URL = import.meta.env.VITE_API_URL;
const socket = io(API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
