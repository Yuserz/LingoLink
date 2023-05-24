import { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
//context api
import { MyDataContext } from "../pages/Home";
import { MyGlobalContext } from "../context/MyGlobalContext";

export function useChat(socket, contactName) {
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  return {
    currentMessage,
    setCurrentMessage,
    messageList,
    messagesEndRef,
    setShowVideoCall,
    setShowMessaging,
    roomId,
    video,
    setVideo,
    audio,
    setAudio,
    inputRef,
    sendMessage,
  };
}
