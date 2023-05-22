import React from "react";
import { useVideoCall } from "../hooks/useVideoCall";

export default function VideoCall() {
  const {
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
  } = useVideoCall();

  return (
    <>
      <div className="container h-full w-full">
        <div className="relative video-container w-full h-full flex">
          <div className="video flex justify-center w-full h-full bg-black rounded-lg dark:bg-black/0">
            {stream && (
              <video
                className="absolute w-fit h-full"
                playsInline
                muted
                ref={myVideo ? myVideo : null}
                autoPlay
                style={{ width: "100%" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo ? userVideo : null}
                autoPlay
                className={`${video ? "w-[400px]" : "hidden"}`}
              />
            ) : null}
          </div>
          <div className="absolute bottom-0 mb-4 w-full self-center place-self-center flex justify-center ">
            <div className="myId bg-white w-fit p-4 rounded-md">
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
                  <button onClick={callUser}>call</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {receivingCall && !callAccepted ? (
          <div className="absolute top-0 left-0 w-full z-9999 h-full flex items-center justify-center bg-black/95">
            <div className="caller flex flex-col w-fit h-fit p-4 bg-primary shadow-lg top-0 rounded-md gap-8">
              <h1>{name} is calling...</h1>
              <div className=" flex gap-2">
                <button
                  className="p-2 bg-white rounded-lg"
                  onClick={answerCall}
                >
                  Answer
                </button>
                <button
                  className="p-2 bg-white rounded-lg"
                  onClick={() => {
                    setReceivingCall(false);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
