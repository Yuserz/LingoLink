import { useEffect, useRef, useState, useContext } from "react";
import Peer from "simple-peer";
import { MyDataContext } from "../context/MyDataContext";
import { getSocket } from "../socket";
import { MyGlobalContext } from "../context/MyGlobalContext";

export function useVideoCall() {
  const socket = getSocket();
  const [stream, setStream] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const { roomId, _id, name, setName, video, setVideo, audio } =
    useContext(MyGlobalContext);
  const {
    contactData,
    showMessaging,
    showVideoCall,
    setShowMessaging,
    setShowVideoCall,
  } = useContext(MyDataContext);
  const myVideo = useRef();
  const userVideo = useRef();

  // Camera/microphone access while the call screen is up.
  useEffect(() => {
    if (showMessaging || !showVideoCall) return undefined;
    let active = true;
    navigator.mediaDevices.getUserMedia({ video, audio }).then((mediaStream) => {
      if (!active) return;
      setStream(mediaStream);
      if (myVideo.current) {
        myVideo.current.srcObject = mediaStream;
      }
    });
    return () => {
      active = false;
    };
  }, [showMessaging, showVideoCall, video, audio]);

  // Room presence + incoming-call signalling.
  useEffect(() => {
    socket.emit("join_room", {
      roomId: roomId,
      userId: _id,
      name: name,
      message: "Call",
    });

    const onCallUser = (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    };
    socket.on("callUser", onCallUser);

    return () => {
      socket.off("callUser", onCallUser);
    };
  }, [roomId, _id, name, setName, socket]);

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: contactData._id,
        signalData: data,
        from: _id,
        name: name,
        roomId: roomId,
      });
    });

    peer.on("stream", (remoteStream) => {
      userVideo.current.srcObject = remoteStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
        roomId: roomId,
      });
    });

    peer.on("stream", (remoteStream) => {
      userVideo.current.srcObject = remoteStream;
    });

    peer.signal(callerSignal);
  };

  const leaveCall = () => {
    setShowMessaging(true);
    setShowVideoCall(false);
    setCallEnded(true);
    setVideo(false);

    // Stop camera and microphone tracks
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return {
    myVideo,
    userVideo,
    stream,
    receivingCall,
    callAccepted,
    callEnded,
    callUser,
    answerCall,
    leaveCall,
    name,
    video,
    setReceivingCall,
  };
}
