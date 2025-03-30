import React, { useState, useEffect, useRef } from "react";
import WebSocketManager from "./WebSocketManager";

const Chat = ({ sessionToken }) => {
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const wsManagerRef = useRef(null); // Store WebSocketManager across renders

  useEffect(() => {
    wsManagerRef.current = new WebSocketManager(sessionToken, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      if (wsManagerRef.current) {
        wsManagerRef.current.closeConnection();
      }
    };
  }, [sessionToken]);

  const sendMessage = () => {
    if (wsManagerRef.current) {
      wsManagerRef.current.sendMessage(recipient, message);
      setMessages((prev) => [...prev, { sender: "Me", recipient, message }]);
      setMessage("");
    } else {
      console.error("WebSocket connection not established.");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <input type="text" placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
