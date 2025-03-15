"use client";

import React, { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]); 
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("sendMessage", input); 
      setInput(""); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-lg bg-gray-600 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Chat App</h2>
        
        <div className="h-64 overflow-y-auto p-2 border border-gray-700 rounded-lg bg-gray-700">
          {messages.map((msg, indx) => (
            <p key={indx} className="p-2 mb-1 rounded-lg bg-gray-600">
              {msg}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
            placeholder="Type a message..."
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
