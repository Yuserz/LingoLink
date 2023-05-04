
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [offerSent, setOfferSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("myRoom14tybd81tq7e8bdaui9712!");

  useEffect(() => {
    socket.on("me", (id) => {
      console.log(`CONNECTED TO SOCKET_ID: ${id}`);
    });

    socket.on("offerReceived", (offer) => {
      console.log(`Received offer from server:`, offer);
      setOfferSent(true);
      setRoomId(offer.roomId);
    });

    socket.on("messageReceived", (message) => {
      console.log(`Received message from server:`, message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("me");
      socket.off("offerReceived");
      socket.off("messageReceived");
      socket.off("disconnect");
    };
  }, []);

  const handleSendOffer = () => {
    //specify the data inside an object to be sent as offer
    const offer = { roomId: roomId, user: "user" };
    socket.emit("offer", offer);
    socket.emit("join_room", roomId);
    setOfferSent(true);
    setRoomId(offer.roomId);
  };

  const handleSendMessage = async () => {
    if (message !== "") {
      const messageData = {
        roomId: roomId,
        message: message
      };

      await socket.emit("message", { messageData });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Socket.io Demo</h1>
      {!offerSent ? (
        <button onClick={handleSendOffer}>Send Offer</button>
      ) : (
        <div>
          <h2>Room ID: {roomId}</h2>
          <h2>Messages</h2>
          <ul>
            {messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
}

export default App;
