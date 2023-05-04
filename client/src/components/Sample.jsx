import { useState, useEffect } from "react";
import {
  initializeSocket,
  joinRoom,
  startCall,
  answerCall,
  endCall,
} from "../utils/signaling";
import { startCall as startRtcCall, answerCall as answerRtcCall, endCall as endRtcCall } from "../utils/rtcConnection";

function VideoCall() {
  const [roomId, setRoomId] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [isCallAnswered, setIsCallAnswered] = useState(false);

  useEffect(() => {
    initializeSocket();

    return () => {
      endCall();
    };
  }, []);

  const handleJoinRoom = () => {
    joinRoom(roomId);
  };

  const handleStartCall = () => {
    startCall("some-user-id", (roomId) => {
      startRtcCall(roomId);
      setIsCallStarted(true);
    });
  };

  const handleAnswerCall = () => {
    answerCall(roomId, () => {
      answerRtcCall();
      setIsCallAnswered(true);
    });
  };

  const handleEndCall = () => {
    endCall();
    endRtcCall();
    setIsCallStarted(false);
    setIsCallAnswered(false);
  };

  return (
    <div>
      <h1>Video Call</h1>
      {!isCallStarted && !isCallAnswered && (
        <div>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
          <button onClick={handleStartCall}>Start Call</button>
        </div>
      )}
      {(isCallStarted || isCallAnswered) && (
        <div>
          <video id="local-video" muted></video>
          <video id="remote-video" autoPlay></video>
          <button onClick={handleEndCall}>End Call</button>
        </div>
      )}
      {isCallStarted && !isCallAnswered && (
        <div>
          <p>Calling...</p>
        </div>
      )}
      {!isCallStarted && isCallAnswered && (
        <div>
          <p>Call Answered</p>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
