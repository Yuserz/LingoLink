import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function Messaging({ data }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(1);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if ( room === 1) {
      socket.emit("join_room", room);
      setShowChat(true);
      setUsername(data.data.name)
    } else {
      console.log("Wrong room credentials");
    }
  };
  useEffect(() => {
    joinRoom();
  }, []);

  // return (
  //   <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
  //     <Chat socket={socket} username={username} room={room} />
  //   </div>
  // );

  return (
    <div className="chat-container my-4 flex justify-center w-full h-full overflow-clip">
      {!showChat ? (
        <div className="joinChatContainer">
          {/* <h3>Join A Chat</h3> */}
          <input
            type="text"
            placeholder={"John..."}
            defaultValue={data.data.name}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            defaultValue={1}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          {/* <button onClick={joinRoom}>Join A Room</button> */}
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Messaging;
