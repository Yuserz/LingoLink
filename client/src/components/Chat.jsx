import { useEffect, useContext } from "react";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { MyDataContext } from "../context/MyDataContext";
import { getSocket } from "../socket";
import Messaging from "./Messaging";
import VideoCall from "./VideoCall";

export default function Chat() {
  const socket = getSocket();
  const { roomId, _id, name } = useContext(MyGlobalContext);
  const { contactName, showVideoCall, showMessaging } =
    useContext(MyDataContext);

  useEffect(() => {
    if (!roomId) return;
    socket.emit("join_room", {
      roomId: roomId,
      userId: _id,
      name: name,
      message: "Chat",
    });
  }, [roomId, _id, name, socket]);

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      {showMessaging ? (
        <Messaging socket={socket} contactName={contactName} />
      ) : null}

      {showVideoCall ? <VideoCall /> : null}
    </div>
  );
}
