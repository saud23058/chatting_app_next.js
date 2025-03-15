"use client";

import React, { useEffect, useState } from "react";


const Home = () => {
  const [text, setText] = useState("");
  const [received, setReceived] = useState<string[]>([]);

  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Messages</h1>
      <div className="w-full max-w-md h-96 overflow-y-auto bg-white rounded-lg shadow-md p-4 mb-6">
        {received.map((msg, index) => (
          <p key={index} className="text-sm my-2 p-2 bg-gray-200 rounded">
            {msg}
          </p>
        ))}
      </div>
      <div className="w-full max-w-md flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
         
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
