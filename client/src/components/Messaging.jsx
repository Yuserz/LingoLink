import io from "socket.io-client";
import { useEffect, useContext } from "react";
import Chat from "./Chat";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { MyDataContext } from "../pages/Home";

const socket = io.connect("http://localhost:3001");

function Messaging() {
  const { roomId, _id, name } = useContext(MyGlobalContext);
  const { contactName } = useContext(MyDataContext);

  const joinRoom = () => {
    if (!roomId) {
      console.log("Wrong room credentials");
    } else {
      socket.emit("join_room", {
        roomId: roomId,
        userId: _id,
        name: name,
        message: "Chat",
      });
    }
  };

  useEffect(() => {
    roomId && joinRoom();
  }, [roomId, name]);

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      <Chat socket={socket} contactName={contactName} roomId={roomId} />
    </div>
  );
}

export default Messaging;
