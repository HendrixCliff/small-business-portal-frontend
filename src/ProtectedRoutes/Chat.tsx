import React, { useEffect, useState } from "react";
import { socket } from "../utils/socket"; // ✅ Import socket instance

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

interface ChatProps {
  userId: string;
  isAdmin: boolean;
}

const Chat: React.FC<ChatProps> = ({ userId, isAdmin }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // ✅ Listen for incoming messages via WebSocket
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message
    });

    return () => {
      socket.off("receiveMessage"); // ✅ Cleanup listener on unmount
    };
  }, []);

  const handleSendMessage = () => {
    if (!text.trim()) return;

    const newMessage: Message = {
      _id: Date.now().toString(),
      senderId: userId,
      receiverId: isAdmin ? "user" : "admin",
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]); // Update local state

    // ✅ Send message via WebSocket
    if (isAdmin) {
      socket.emit("adminReply", {
        receiverId: userId,
        message: text,
      });
    } else {
      socket.emit("sendMessage", {
        senderId: userId,
        message: text,
      });
    }

    setText(""); // Clear input
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* ✅ Chat Header */}
      <h2 className="text-center text-xl font-semibold bg-blue-500 text-white py-2 rounded-md shadow-md">
        {isAdmin ? "Admin Panel" : "Chat with Admin"}
      </h2>

      {/* ✅ Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs text-white ${
                msg.senderId === userId ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <strong className="block text-sm opacity-80">
                {msg.senderId === userId ? "You" : "Admin"}
              </strong>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Input Box */}
      <div className="flex gap-2 p-2 bg-white shadow-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
