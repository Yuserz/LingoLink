import { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import { MyDataContext } from "../context/MyDataContext";
import { MyGlobalContext } from "../context/MyGlobalContext";

export function useChat(socket) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);
  const { setShowVideoCall } = useContext(MyDataContext);
  const { roomId, setVideo, name } = useContext(MyGlobalContext);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, [currentMessage]);

  const sendMessage = async () => {
    // Whitespace-only input would render as a blank bubble.
    if (currentMessage.trim() !== "") {
      const messageData = {
        roomId: roomId,
        // Stamp with the SENDER's name so each client can tell its own
        // bubbles (rendered right) from the contact's (rendered left).
        author: name,
        message: currentMessage,
        time: moment().format("h:mm A"),
      };

      socket.emit("send_message", messageData);
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
    setVideo,
    inputRef,
    sendMessage,
  };
}
