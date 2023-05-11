import React, { createContext, useState, useMemo, useEffect } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState(sessionStorage.getItem("_id") || "");
  const [roomId, setRoomId] = useState(sessionStorage.getItem("roomId") || "");
  const [userData, setUserData] = useState(
    sessionStorage.getItem("userData" || "")
  );
  const [video, setVideo] = useState(
    sessionStorage.getItem("video") === "true" ? true : false
  );
  const [audio, setAudio] = useState(
    sessionStorage.getItem("Audio") === "true" ? false : true
  );

  useEffect(() => {
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("roomId", roomId);
    sessionStorage.setItem("userData", userData);
    sessionStorage.setItem("video", video);
    sessionStorage.setItem("audio", audio);
    sessionStorage.setItem("roomId", roomId);
  }, [_id, roomId, userData, video, audio]);

  const contextValue = useMemo(
    () => ({
      _id,
      set_id,
      roomId,
      setRoomId,
      userData,
      setUserData,
      video,
      setVideo,
      audio,
      setAudio,
    }),
    [
      _id,
      set_id,
      roomId,
      setRoomId,
      userData,
      setUserData,
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
