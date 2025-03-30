import { io, Socket } from "socket.io-client";

// ✅ Singleton Pattern: Ensure only one instance of Socket.IO is created
const SOCKET_URL = "http://localhost:8000";

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"], // ✅ Force WebSocket transport
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000,
});

export { socket };
