import io from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { MyDataContext } from "../pages/Home";
import Messaging from "./Messaging";
import VideoCall from "./VideoCall";

const socket = io.connect("http://localhost:3001");

export default function Chat() {
  const [incomingCall, setIncomingCall] = useState(false);
  const { roomId, _id, name } = useContext(MyGlobalContext);
  const { contactName, showVideoCall, showMessaging } =
    useContext(MyDataContext);

  const joinRoom = () => {
    if (roomId) {
      socket.emit("join_room", {
        roomId: roomId,
        userId: _id,
        name: name,
        message: "Chat",
      });
    } else {
      // console.log("Wrong room credentials");
    }
  };

  useEffect(() => {
    roomId && joinRoom();
  }, [roomId, name]);

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      {showMessaging ? (
        <Messaging socket={socket} contactName={contactName} roomId={roomId} />
      ) : null}

      {showVideoCall ? (
        <>
          <VideoCall handleIncomingCall={setIncomingCall} />
          {incomingCall ? (
            <div className="call-offer">Incoming Call...</div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
