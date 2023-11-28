import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Login, SendMessageApi } from "../../apiServices";

const SendMessage = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    let res = await SendMessageApi({
      to,
      message,
    });
  };

  return (
    <div>
      <label htmlFor="to">To:</label>
      <input
        type="text"
        id="to"
        name="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />

      <label htmlFor="msg">Message:</label>
      <input
        type="text"
        id="msg"
        name="msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
