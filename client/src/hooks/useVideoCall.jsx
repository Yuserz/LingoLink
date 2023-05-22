import { useEffect, useRef, useState, useContext } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { MyDataContext } from "../pages/Home";
import { MyGlobalContext } from "../context/MyGlobalContext";

const socket = io.connect("http://localhost:3001");

export function useVideoCall() {
  const [stream, setStream] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const { roomId, _id, name, setName, video, setVideo, audio, setAudio } =
    useContext(MyGlobalContext);
  const { contactData } = useContext(MyDataContext);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: video, audio: audio })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.emit("join_room", {
      roomId: roomId,
      userId: _id,
      name: name,
      message: "Video Call",
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off("callUser");
    };
  }, []);

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

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
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

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
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
