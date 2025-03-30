import { io } from "socket.io-client";

// Connect to WebSocket server
const socket = io("http://localhost:8000"); // Match backend port

export {socket};
