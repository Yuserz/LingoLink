import io from "socket.io-client";
import { useEffect } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function Messaging({ data }) {
  const username = data.data.name;
  const room = 1; //set to constant room number for now

  const joinRoom = () => {
    if (!room) {
      console.log("Wrong room credentials");
    } else {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default Messaging;
