import React, { useContext } from "react";
import { useVideoCall } from "../hooks/useVideoCall";
import { MyDataContext } from "../pages/Home";

export default function VideoCall() {
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
            {video ? (
              <div className="video max-w-[20%] absolute top-0 right-0">
                {stream && (
                  <video
                    className=" h-full z-20 shadow-md rounded"
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            ) : (
              ""
            )}

            <div className="video flex justify-center w-full h-full bg-black rounded-lg dark:bg-black/0">
              {callAccepted && !callEnded ? (
                <video
                  playsInline
                  ref={userVideo}
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
            <div className="absolute top-0 left-0 w-full z-9999 h-full flex items-center justify-center bg-black/80">
              <div className="caller flex flex-col h-fit justify-center items-center p-4 bg-white w-[200px] dark:bg-gray-600 border shadow-lg top-0 rounded-md gap-8">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <div className="flex bg-primary dark:bg-black items-center justify-center border-2 w-[100px] h-[100px]  rounded-full">
                    <h1 className="uppercase text-white font-semibold text-6xl">
                      {contactName.charAt(0)}
                    </h1>
                  </div>
                  <h1 className="opacity-70">
                    {" "}
                    <span className="capitalize font-semibold dark:text-white">
                      {name}
                    </span>{" "}
                    <span className="dark:text-white">is calling...</span>
                  </h1>
                </div>
                <div className="btn-container flex gap-2">
                  <button
                    className="p-2 rounded-lg text-white bg-[#FF6565]/80 border-[#FF6565]/20 border-2 hover:bg-[#FF6565] hover:scale-[110%] hover:text-white transition ease-in-out"
                    onClick={() => {
                      setReceivingCall(false);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="Answer-call-btn p-2 rounded-lg hover:scale-[120%] hover:text-white transition ease-in-out"
                    onClick={() => {
                      answerCall();
                    }}
                  >
                    <svg
                      className="flex fill-primary"
                      width="61"
                      height="61"
                      viewBox="0 0 61 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32.5333 27.9583V12.7083H37.6167V19.3167L50.325 6.60834L53.8833 10.1667L41.175 22.875H47.7833V27.9583H32.5333ZM50.7063 53.375C45.2417 53.375 39.9152 52.1567 34.7268 49.7201C29.5384 47.2835 24.9422 44.064 20.9383 40.0618C16.9343 36.0595 13.7148 31.4633 11.2799 26.2732C8.845 21.0831 7.62669 15.7566 7.625 10.2938C7.625 9.53125 7.87917 8.89584 8.3875 8.3875C8.89583 7.87917 9.53125 7.625 10.2938 7.625H20.5875C21.1806 7.625 21.7101 7.81563 22.176 8.19688C22.642 8.57813 22.9174 9.06528 23.0021 9.65834L24.6542 18.5542C24.7389 19.1472 24.7279 19.6878 24.6211 20.1758C24.5144 20.6638 24.2712 21.0975 23.8917 21.4771L17.7917 27.7042C19.5708 30.7542 21.7948 33.6135 24.4635 36.2823C27.1323 38.951 30.0764 41.2597 33.2958 43.2083L39.2688 37.2354C39.65 36.8542 40.1482 36.5687 40.7633 36.3789C41.3783 36.1891 41.9816 36.1357 42.5729 36.2188L51.3417 37.9979C51.9347 38.125 52.4219 38.4114 52.8031 38.857C53.1844 39.3026 53.375 39.8211 53.375 40.4125V50.7063C53.375 51.4688 53.1208 52.1042 52.6125 52.6125C52.1042 53.1208 51.4688 53.375 50.7063 53.375Z" />
                    </svg>
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
