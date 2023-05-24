import React, { useContext } from "react";
import { useVideoCall } from "../hooks/useVideoCall";
import { MyDataContext } from "../pages/Home";

import endCall from "../assets/icons/callWhite.svg";

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
                      className=" hover:scale-[110%] shadow-md transition ease-in-out duration-200 bg-[#FF6565] rounded-xl p-1"
                      onClick={leaveCall}
                    >
                      <svg
                        className="fill-white w-12 h-12"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.95 21C17.8 21 15.7043 20.525 13.663 19.575C11.6217 18.625 9.81333 17.3583 8.238 15.775C6.66267 14.1917 5.396 12.379 4.438 10.337C3.48 8.295 3.00067 6.19933 3 4.05V3.525C3 3.34167 3.01667 3.16667 3.05 3H8.9L9.825 8.025L6.975 10.9C7.675 12.1 8.55433 13.225 9.613 14.275C10.6717 15.325 11.834 16.2333 13.1 17L16 14.1L21 15.1V20.95C20.8333 20.9667 20.6583 20.9793 20.475 20.988C20.2917 20.9967 20.1167 21.0007 19.95 21Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className=" hover:scale-[110%] transition ease-in-out duration-200"
                      onClick={callUser}
                    >
                      <svg
                        className="dark:fill-white fill-primary w-12 h-12"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.95 21C17.8 21 15.7043 20.525 13.663 19.575C11.6217 18.625 9.81333 17.3583 8.238 15.775C6.66267 14.1917 5.396 12.379 4.438 10.337C3.48 8.295 3.00067 6.19933 3 4.05V3.525C3 3.34167 3.01667 3.16667 3.05 3H8.9L9.825 8.025L6.975 10.9C7.675 12.1 8.55433 13.225 9.613 14.275C10.6717 15.325 11.834 16.2333 13.1 17L16 14.1L21 15.1V20.95C20.8333 20.9667 20.6583 20.9793 20.475 20.988C20.2917 20.9967 20.1167 21.0007 19.95 21Z" />
                      </svg>
                    </button>
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
