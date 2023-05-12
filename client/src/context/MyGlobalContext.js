import React, { createContext, useState, useMemo, useEffect } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState(sessionStorage.getItem("_id") || "");
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [roomId, setRoomId] = useState(sessionStorage.getItem("roomId") || "");
  const [video, setVideo] = useState(
    sessionStorage.getItem("video") === "true" ? true : false
  );
  const [audio, setAudio] = useState(
    sessionStorage.getItem("Audio") === "true" ? false : true
  );

  useEffect(() => {
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("roomId", roomId);
    sessionStorage.setItem("video", video);
    sessionStorage.setItem("audio", audio);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
  }, [_id, roomId, video, audio, name, email]);

  const contextValue = useMemo(
    () => ({
      _id,
      set_id,
      name,
      setName,
      email,
      setEmail,
      roomId,
      setRoomId,
      video,
      setVideo,
      audio,
      setAudio,
    }),
    [
      _id,
      set_id,
      name,
      setName,
      email,
      setEmail,
      roomId,
      setRoomId,
      video,
      setVideo,
      audio,
      setAudio,
    ]
  );

  return (
    <MyGlobalContext.Provider value={contextValue}>
      {children}
    </MyGlobalContext.Provider>
  );
};
