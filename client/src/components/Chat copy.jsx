import io from "socket.io-client";
import { useEffect, useContext, useState } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { MyDataContext } from "../pages/Home";
import Messaging from "./Messaging";
import VideoCall from "./VideoCall";
import { useVideoCall } from "../hooks/useVideoCall";

const socket = io.connect("http://localhost:3001");

export default function Chat() {
  const { roomId, _id, name, setVideo } = useContext(MyGlobalContext);
  const { contactName, showMessaging, setShowMessaging } =
    useContext(MyDataContext);

  const joinRoom = () => {
    if (roomId) {
      setVideo(true);
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

  const { callUser, callAccepted } = useVideoCall();

  if (callAccepted) {
    setShowMessaging(false);
    setVideo(true);
  }

  return (
    <div className={`chat-container my-4 flex justify-center w-full h-full overflow-clip ${!showMessaging ? "bg-black rounded-lg dark:bg-black" : "" }`}>
      {showMessaging ? (
        <Messaging
          socket={socket}
          contactName={contactName}
          roomId={roomId}
          callUser={callUser}
        />
      ) : null}
      <div>
        <VideoCall />
      </div>
    </div>
  );
}
