import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import VideoCall from "./VideoCall";
//icons
import sendBtn from "../assets/icons/send.svg";
import callBtn from "../assets/icons/call.svg";
import cameraBtn from "../assets/icons/cam.svg";
//context api
import { MyDataContext } from "../pages/Home";
import { MyGlobalContext } from "../context/MyGlobalContext";

function Chat({ socket, contactName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState(() => {
    const savedMessages = sessionStorage.getItem("messageList");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const messagesEndRef = useRef(null);
  const { setShowVideoCall, setShowMessaging } = useContext(MyDataContext);
  const { roomId, video, setVideo, audio, setAudio } =
    useContext(MyGlobalContext);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, [currentMessage]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId,
        author: contactName,
        message: currentMessage,
        time: moment().format("h:mm A"),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  //auto scroll to new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  return (
    <>
      <div className="chat-window w-3/4 h-full grid grid-cols-1 grid-rows-4  grid-flow-rows justify-between p-2 gap-2">
        <div className="contact-profile row-span-full my-4 w-full flex justify-center h-full p-4 items-center">
          <div className="flex flex-col justify-center w-fit ">
            <img
              className="profile-image w-32 h-32 rounded-full border-2 border-gray-300 shadow-sm overflow-hidden bg-primary"
              src=""
              alt=""
            />
            <h4 className="text-center text-black/50 capitalize">
              {contactName}
            </h4>
          </div>
        </div>
        <div className="flex flex-col place-self-end w-full gap-2 row-span-3">
          <div className="chat-body h-full overflow-auto">
            <div className="message-box flex flex-col gap-2 h-full max-h-[380px] overflow-y-auto">
              {messageList.map((messageContent, index) => {
                const time = moment(messageContent.time, "h:mm A");
                const timeDiff = moment().diff(time, "minutes");
                const timeDisplay =
                  timeDiff < 1 ? "now" : time.format("h:mm A");
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
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="chat-footer flex gap-4 items-center">
          <div className="p-4 px-3 w-full h-fit flex bg-white dark:text-black dark:border-gray-700  dark:bg-gray-500/50 rounded-2xl gap-1">
            <div className="flex overflow-y-auto w-full max-h-[100px] ">
              <textarea
                ref={inputRef}
                className="p-2 mr-6 py-1 text-start break-words w-full h-fit resize-none outline-none bg-white/0 dark:text-secondary"
                type="text"
                value={currentMessage}
                placeholder="Type a message..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
                rows={1}
                style={{ overflowY: "hidden" }}
              />
            </div>
            <button
              onClick={() => {
                setShowVideoCall(true);
                setShowMessaging(false);
                setVideo(true);
              }}
              className="p-2 hover:border-2 hover:border-primary/50 border-2 border-white/0 rounded-xl focus:border-primary"
            >
              {" "}
              <img className="w-8 h-6" src={cameraBtn} alt="" />
            </button>
            <button
              onClick={() => {
                setShowVideoCall(true);
                setShowMessaging(false);
                setVideo(false);
              }}
              className="p-2 hover:border-2 hover:border-primary/50 border-2 border-white/0 rounded-xl focus:border-primary"
            >
              {" "}
              <img className="w-8 h-6" src={callBtn} alt="" />
            </button>
          </div>
          <button onClick={sendMessage}>
            <img src={sendBtn} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
