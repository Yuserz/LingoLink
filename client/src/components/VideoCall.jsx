import React, { useEffect, useRef, useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { MyDataContext } from "../pages/Home";
import { MyGlobalContext } from "../context/MyGlobalContext";

const socket = io.connect("http://localhost:3001");
export default function VideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const { userData, contactData } = useContext(MyDataContext);
  const { roomId, _id } = useContext(MyGlobalContext)
  

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userData.name,
        name: name,
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
        callerId: socket.id,
        toCallId: me,
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
    if (callEnded) {
      connectionRef.current.destroy();
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container h-full w-full">
        <div className="relative video-container w-full h-full flex">
          <div className="video flex justify-center w-full h-full bg-black rounded-lg">
            {stream && (
              <video
                className="absolute w-fit h-full"
                playsInline
                muted
                ref={myVideo}
                autoPlay
                // style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                // style={{ width: "300px" }}
              />
            ) : null}
          </div>
          <div className="absolute bottom-0 mb-4 w-full self-center place-self-center flex justify-center ">
            <div className="myId bg-white w-fit p-4 rounded-md">
              {/* <input
                id="filled-basic"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "20px" }}
              /> */}
              <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                <button variant="contained" color="primary">
                  Copy ID
                </button>
              </CopyToClipboard>

              <input
                id="filled-basic"
                label="ID to call"
                variant="filled"
                placeholder={me}
                value={idToCall}
                // defaultValue={me}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              <div className="call-button">
                {callAccepted && !callEnded ? (
                  <button
                    variant="contained"
                    color="secondary"
                    onClick={leaveCall}
                  >
                    End Call
                  </button>
                ) : (
                  <button onClick={() => callUser(idToCall)}>call</button>
                )}
                {/* {idToCall} */}
              </div>
            </div>
          </div>
        </div>

        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
