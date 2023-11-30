import React, { useEffect } from "react";
import LoginForm from "./components/Auth/index";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Messsages } from "./components/Chat/Messages";
import { MesssageDetails } from "./components/Chat/MessageDetails";
import io from "socket.io-client";
import SendMessage from "./components/Chat/SendMessage";
import eventEmitter from "./events/events";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/messages",
    element: <Messsages />,
  },
  {
    path: "/message-details/:anotherPerson",
    element: <MesssageDetails />,
  },
  {
    path: "/sendMessage",
    element: <SendMessage />,
  },
]);

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Replace 'http://your-server-url' with the actual URL of your Socket.IO server
      const socket = io(
        `http://localhost:8080/?isLoggedIn=true&userId=${localStorage.getItem(
          "userId"
        )}`
      );

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

      socket.on("privateMessage", () => {
        console.log("Message from the server");
        alert("New Message");
        eventEmitter.emit("ReloadMessage");
      });

      socket.on("MessageDelivered", () => {
        console.log("Message from the server");
        alert("Message Delivered");
        eventEmitter.emit("ReloadMessage");
      });

      // Function to emit the "messageDelivered" event
      const sendMessageDeliveredEvent = () => {
        socket.emit("messagesDelivered", localStorage.getItem("userId"));
        console.log("Emitted: messagesDelivered");
      };

      // Call the function to emit the event (you can trigger this function as needed)
      if (localStorage.getItem("userId")) sendMessageDeliveredEvent();

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, []); // Only run this effect once when the component mounts

  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
