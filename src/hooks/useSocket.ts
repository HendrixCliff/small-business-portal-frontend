import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  senderId: string;
  message: string;
  senderRole: string;
}

export const useSocket = (userId: string, isAdmin: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // ✅ Ensure correct backend URL
    const newSocket = io("http://localhost:8000", { transports: ["websocket", "polling"] });

    newSocket.on("connect", () => {
      console.log("✅ WebSocket connected:", newSocket.id);
    });

    newSocket.emit("joinRoom", userId);
    console.log(`🔗 Joined room: ${userId}`);

    newSocket.on("message", (newMessage: Message) => {
      console.log("📩 New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on("messageSent", (confirmation: Message) => {
      console.log("✅ Message sent confirmation:", confirmation);
      setMessages((prevMessages) => [...prevMessages, confirmation]);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("❌ WebSocket disconnected on cleanup");
    };
  }, [userId, isAdmin]);

  const sendMessage = (text: string) => {
    if (!socket) return;

    const messageData: Message = {
      senderId: userId,
      message: text,
      senderRole: isAdmin ? "admin" : "user",
    };

    setMessages((prevMessages) => [...prevMessages, messageData]);
    socket.emit("message", messageData);
    console.log(`📤 Sent message:`, messageData);
  };

  return { messages, sendMessage };
};
