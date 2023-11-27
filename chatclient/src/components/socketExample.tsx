import React, { useEffect } from "react";
import io from "socket.io-client";

const SocketExample = () => {
  useEffect(() => {
    // Replace 'http://your-server-url' with the actual URL of your Socket.IO server
    const socket = io("http://localhost:8080");

    // Connect to the server
    socket.connect();

    // Event listener for connecting to the server
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Event listener for disconnecting from the server
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Function to emit the "messageDelivered" event
    const sendMessageDeliveredEvent = () => {
      socket.emit("messageDelivered");
      console.log("Emitted: messageDelivered");
    };

    // Call the function to emit the event (you can trigger this function as needed)
    sendMessageDeliveredEvent();

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Only run this effect once when the component mounts

  return (
    <div>
      <h1>Socket.IO Example</h1>
      {/* Your component content */}
    </div>
  );
};

export default SocketExample;
