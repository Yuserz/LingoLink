import React, { useContext } from "react";
import { useVideoCall } from "../hooks/useVideoCall";
import { MyDataContext } from "../pages/Home";

import endCall from "../assets/icons/callWhite.svg"

export default function VideoCall({ handleIncomingCall }) {
  const { showVideoCall, contactName } = useContext(MyDataContext);
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
      {showVideoCall ? (
        <div className="container h-full w-full">
          <div className="relative video-container w-full h-full flex">
            <div className="video max-w-[20%] absolute top-0 right-0">
              {stream && (
                <video
                  className=" h-full z-20 shadow-md rounded"
                  playsInline
                  muted
                  ref={myVideo ? myVideo : null}
                  autoPlay
                  style={{ width: "100%" }}
                />
              )}
            </div>
            <div className="video flex justify-center w-full h-full bg-black rounded-lg dark:bg-black/0">
              {callAccepted && !callEnded ? (
                <video
                  playsInline
                  ref={userVideo ? userVideo : null}
                  autoPlay
                  className={`${video ? "w-full" : "hidden"}`}
                />
              ) : (
                <div className="video flex justify-center w-full h-full bg-black rounded-lg dark:bg-black/0">
                  <div className="flex flex-col justify-center w-fit ">
                    <div className="flex bg-primary dark:bg-black items-center justify-center border-2 w-[100px] h-[100px]  rounded-full">
                      <h1 className="uppercase text-white font-semibold text-6xl">
                        {contactName.charAt(0)}
                      </h1>
                    </div>
                  </div>{" "}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 mb-4 w-full self-center place-self-center flex justify-center ">
              <div className="myId  w-fit p-4 rounded-md">
                <div className="call-button">
                  {callAccepted && !callEnded ? (
                    <button
                      variant="contained"
                      color="secondary"
                      onClick={leaveCall}
                    >
                      <img className="p-2 w-14 h-14 bg-red-500 rounded-xl shadow-md" src={endCall} alt="" />
             
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
                    onClick={() => {
                      answerCall();
                      handleIncomingCall();
                    }}
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
      ) : (
        ""
      )}
    </>
  );
}
