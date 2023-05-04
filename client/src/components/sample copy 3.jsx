import { useState, useEffect } from "react";
import useSocket from "../utils/signaling";
import useWebRTC from "../utils/rtcConnection";

export default function VideoCall({room}) {
  const [localStream, setLocalStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");

  const signaling = useSocket(
    room,
    null,
    () => setIsCalling(true),
    () => setIsAnswering(false),
    () => setIsAnswering(false),
    () => {
      setIsCalling(false);
      setIsAnswering(false);
    }
  );

  const pc = useWebRTC(localStream, remoteVideo, signaling);

  async function startCall() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
      localVideo.srcObject = stream;
      localVideo.play();
      setIsCalling(true);
      signaling.startCall();
    } catch (error) {
      console.error("Error starting video call.", error);
    }
  }

  function endCall() {
    localVideo.srcObject.getTracks().forEach((track) => track.stop());
    setLocalStream(null);
    setIsCalling(false);
    setIsAnswering(false);
    signaling.endCall();
  }

  function answerCall() {
    setIsAnswering(true);
    signaling.answerCall();
  }

  function rejectCall() {
    setIsAnswering(false);
    signaling.rejectCall();
  }

  useEffect(() => {
    if (pc && isAnswering && !isCalling) {
      pc.createAnswer().then((answer) => {
        pc.setLocalDescription(answer).then(() => {
          signaling.send({
            type: "answer",
            data: { sdp: pc.localDescription },
          });
        });
      });
    }
  }, [pc, isAnswering, isCalling, signaling]);

  return (
    <div>
      <div>
        <video id="localVideo" />
        <video id="remoteVideo" />
      </div>
      {isCalling && (
        <button onClick={endCall}>End Call</button>
      )}
      {!isCalling && !isAnswering && (
        <button onClick={startCall}>Start Call</button>
      )}
      {!isCalling && isAnswering && (
        <>
          <button onClick={answerCall}>Answer Call</button>
          <button onClick={rejectCall}>Reject Call</button>
        </>
      )}
    </div>
  );
}
