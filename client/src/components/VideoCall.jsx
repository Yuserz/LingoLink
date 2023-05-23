import React, { useContext } from "react";
import { useVideoCall } from "../hooks/useVideoCall";
import { MyDataContext } from "../pages/Home";

export default function VideoCall({ handleIncomingCall }) {
  const { showVideoCall } = useContext(MyDataContext);
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
                  className=" h-full z-50 shadow-md rounded"
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
                    <img
                      className="profile-image w-40  h-40 rounded-full border-2 border-gray-300 shadow-sm overflow-hidden bg-primary"
                      src=""
                      alt=""
                    />
                    <h4 className="text-center text-black/50 capitalize dark:text-white">
                      {/* {contactName} */}
                    </h4>
                  </div>{" "}
                </div>
              )}
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
