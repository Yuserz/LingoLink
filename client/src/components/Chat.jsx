import React, { useEffect, useState, useRef } from "react";
import InputField from "./InputField";

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
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  return (
    <div className="chat-window w-full h-full border flex justify-between flex-col p-2">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-input-botton flex flex-col gap-2">
        <div className="chat-body">
          <div className="flex flex-col gap-2 h-full max-h-[300px] overflow-y-auto">
            {messageList.map((messageContent) => {
              return (
                <div
                  className={`${
                    username === messageContent.author ? "self-start" : "self-end"
                  }`}
                  // id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p
                        className={`w-full  rounded-xl px-3 py-2 ${
                          username === messageContent.author
                            ? "bg-primary text-white"
                            : "bg-white self-end"
                        }`}
                      >
                        {messageContent.message}
                      </p>
                    </div>
                    <div className="message-meta flex gap-2">
                      <p className="text-gray-500" id="time">
                        {messageContent.time}
                      </p>
                      <p className="text-gray-500" id="author">
                        {messageContent.author}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="chat-footer flex">
          <InputField
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            // beforeinput={(event) => {
            //   event.key === "Enter" && sendMessage();
            // }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
