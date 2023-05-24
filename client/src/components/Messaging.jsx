import React, { useContext} from "react";
import moment from "moment";
import { MyGlobalContext } from "../context/MyGlobalContext";

//context
import { MyDataContext } from "../pages/Home";

//icons
import sendBtn from "../assets/icons/send.svg";
import callBtn from "../assets/icons/call.svg";
import cameraBtn from "../assets/icons/cam.svg";

//hooks
import { useChat } from "../hooks/useChat";

export default function Messaging({ socket, contactName }) {
  const { setShowMessaging } = useContext(MyDataContext);
  const { roomId } = useContext(MyGlobalContext);
  const {
    currentMessage,
    setCurrentMessage,
    messageList,
    messagesEndRef,
    setShowVideoCall,
    setVideo,
    inputRef,
    sendMessage,
  } = useChat(socket, contactName);

  return (
    <>
      <div className="chat-window w-3/4 h-full grid grid-cols-1 grid-rows-4  grid-flow-rows justify-between p-2 gap-2">
        <div className="contact-profile row-span-full my-4 w-full flex justify-center h-full p-4 items-center">
          <div className="flex flex-col justify-center w-fit ">
            <div className="flex bg-primary dark:bg-black items-center justify-center border-2 w-[100px] h-[100px]  rounded-full">
              <h1 className="uppercase text-white font-semibold text-6xl">
                {contactName.charAt(0)}
              </h1>
            </div>
            <h2 className="text-center mt-1 dark:text-white opacity-70">
              {contactName}
            </h2>
          </div>
        </div>
        <div className="flex flex-col place-self-end w-full gap-2 row-span-3">
          <div className="chat-body h-full overflow-auto">
            <div className="message-box flex flex-col gap-2 h-full max-h-[380px] overflow-y-auto">
              {messageList.map((messageContent, index) => {
                const time = moment(messageContent.time, "h:mm A");
                const timeDiff = moment().diff(time, "minutes");
                const timeDisplay = timeDiff < 1 ? "" : time.format("h:mm A");

                if (roomId === messageContent.roomId) {
                  // Render the message content only if the author matches the contactName
                  return (
                    <div
                      key={index}
                      className={`message-content-container w-fit max-w-[70%] px-4 ${
                        contactName === messageContent.author
                          ? "self-start"
                          : "self-end"
                      }`}
                    >
                      <div className="message-content">
                        <p
                          className={`w-full rounded-2xl p-4 overflow-hidden ${
                            contactName === messageContent.author
                              ? "bg-primary dark:bg-gray-500/20 text-white"
                              : "bg-white self-end"
                          }`}
                        >
                          {messageContent.message}
                        </p>
                      </div>
                      <div className="message-meta flex justify-end gap-2">
                        <p className="text-gray-400 text-sm" id="time">
                          {timeDisplay}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  // Render an empty <div> for other messages
                  return <div key={index}></div>;
                }
              })}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="chat-footer flex gap-4 items-center">
          <div className="chat-input-container p-4 px-3 w-full h-fit grid grid-flow-row-dense grid-cols-5  bg-white dark:text-black dark:border-gray-700  dark:bg-gray-500/50 rounded-2xl gap-1">
            <div className="flex col-span-4">
              <textarea
                ref={inputRef}
                className="p-2 inline-block break-words mr-6 py-1 h-fit w-full resize-none outline-none bg-white/0 dark:text-secondary"
                type="text"
                value={currentMessage}
                placeholder="Type a message..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    // Send the message
                    sendMessage();
                    // Prevent the default behavior of adding a new line
                    event.preventDefault();
                  }
                }}
              />
            </div>
            <div className="flex gap-2 col-span-1 justify-end">
              {/* //video chat */}
              <button
                onClick={() => {
                  setShowVideoCall(true);
                  setShowMessaging(false);
                  setVideo(true);
                }}
                className="p-2 min-w-fit  hover:border-2 hover:border-primary/50 border-2 border-white/0 rounded-xl focus:border-primary"
              >
                {" "}
                <img className="w-8 h-6" src={cameraBtn} alt="" />
              </button>
              {/* //Voice chat */}
              <button
                onClick={() => {
                  setShowVideoCall(true);
                  setShowMessaging(false);
                  setVideo(false);
                }}
                className="p-2 min-w-fit  hover:border-2 hover:border-primary/50 border-2 border-white/0 rounded-xl focus:border-primary"
              >
                {" "}
                <img className="w-8 h-6" src={callBtn} alt="" />
              </button>
            </div>
          </div>

          <button onClick={sendMessage}>
            <img src={sendBtn} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
