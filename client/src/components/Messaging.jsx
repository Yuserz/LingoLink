import io from "socket.io-client";
import { useEffect, useCallback, useState, useContext } from "react";
import Chat from "./Chat";
import { getRoomId } from "../api/api";
import { MyGlobalContext } from "../context/MyGlobalContext";
import { MyDataContext } from "../pages/Home";

const socket = io.connect("http://localhost:3001");

function Messaging() {
  const [email, setEmail] = useState();
  const { _id, roomId, setRoomId } = useContext(MyGlobalContext);
  const { contactName, setContactName } = useContext(MyDataContext);

  const userId = _id;

  const fetchRoomId = useCallback(async () => {
    try {
      const response = await getRoomId({ userId, email: email });
      // console.log("response", response.data.roomId);
      if (response) {
        const { roomId, name } = response.data;
        setRoomId(roomId);
        setContactName(name);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId, email]);

  useEffect(() => {
    fetchRoomId();
  }, []);

  // useEffect(() => {
  //   console.log("roomId:", roomId);
  // }, [roomId]);

  const joinRoom = () => {
    if (!roomId) {
      console.log("Wrong room credentials");
    } else {
      socket.emit("join_room", roomId);
    }
  };

  useEffect(() => {
    roomId && joinRoom();
  }, [roomId]);

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      <Chat socket={socket} contactName={contactName} roomId={roomId} />
    </div>
  );
}

export default Messaging;
