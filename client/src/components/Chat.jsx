import React, {
  useEffect,
  useState,
  useRef,
  useContext
} from "react";
import moment from "moment";

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
  const { roomId } = useContext(MyGlobalContext);

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
    <div className="chat-window w-3/4 h-full flex justify-between flex-col p-2 gap-2">
      <div className="contact-profile  pt-2 w-full flex justify-center h-full p-4 items-center">
        <div className="flex flex-col justify-center w-fit">
          {/* <img className="profile-image w-full h-full" src="" alt="" /> */}
          <h4 className="text-center">{contactName}</h4>
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
                    contactName === messageContent.author
                      ? "self-start"
                      : "self-end"
                  }`}
                >
                  <div className="message-content">
                    <p
                      className={`w-full rounded-2xl p-4 ${
                        contactName === messageContent.author
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
        <div className="p-3 px-4 w-full h-fit flex bg-white rounded-2xl gap-1">
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
          <button className="p-2 hover:border-2 hover:border-primary/50 border-2 border-white/0 rounded-xl focus:border-primary">
            {" "}
            <img className="w-8 h-6" src={cameraBtn} alt="" />
          </button>
          <button
            onClick={() => {
              console.log("clicked");
              setShowVideoCall(true);
              setShowMessaging(false);
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
  );
}

export default Chat;
