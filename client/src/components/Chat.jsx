import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import sendBtn from "../assets/icons/send.svg"

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  return (
    <div className="chat-window w-3/4 h-full flex justify-between flex-col p-2 gap-2">
      <div className="contact-profile  pt-2 w-full flex justify-center h-full p-4 items-center">
        <div className="flex flex-col justify-center w-fit">
          {/* <img className="profile-image w-full h-full" src="" alt="" /> */}
          <h4 className="text-center">{username}</h4>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="chat-body h-full overflow-auto">
          <div className="message-box flex flex-col gap-2 h-full max-h-[400px] overflow-y-auto">
            {messageList.map((messageContent, index) => {
              const time = moment(messageContent.time, "h:mm A");
              const timeDiff = moment().diff(time, "minutes");
              const timeDisplay = timeDiff < 1 ? "now" : time.format("h:mm A");
              return (
                <div
                  key={index}
                  className={`message-content-container w-fit max-w-[70%] px-4 ${
                    username === messageContent.author
                      ? "self-start"
                      : "self-end"
                  }`}
                >
                  <div className="message-content">
                    <p
                      className={`w-full rounded-2xl p-4 ${
                        username === messageContent.author
                          ? "bg-primary text-white"
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
      <div className="chat-footer flex gap-4">
        <div className="p-3 px-4 w-full flex bg-white rounded-2xl">
          <input
            className="p-1 w-full outline-none"
            type="text"
            value={currentMessage}
            placeholder="Type a message..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button>
            {" "}
            <img src="" alt="" />
          </button>
          <button>
            {" "}
            <img src="" alt="" />
          </button>
        </div>
        <button onClick={sendMessage}><img src={sendBtn} alt="" /></button>
      </div>
    </div>
  );
}

export default Chat;
