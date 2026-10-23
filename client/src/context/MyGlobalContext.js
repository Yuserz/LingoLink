import React, { createContext, useState, useMemo, useEffect } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState(sessionStorage.getItem("_id") || "");
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [myEmail, setMyEmail] = useState(sessionStorage.getItem("myEmail") || "");
  const [roomId, setRoomId] = useState(sessionStorage.getItem("roomId") || "");
  const [video, setVideo] = useState(
    sessionStorage.getItem("video") === "true" ? true : false
  );
  const [audio, setAudio] = useState(
    sessionStorage.getItem("audio") !== "false"
  );

  //Theme — never an undefined value: anything not explicitly "dark" is "light".
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("roomId", roomId);
    sessionStorage.setItem("video", video);
    sessionStorage.setItem("audio", audio);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("myEmail", myEmail);
    localStorage.setItem("theme", theme);
  }, [_id, roomId, video, audio, name, myEmail, theme]);

  // Single source of truth for the <html> class, so the theme applies on every
  // page (auth screens included) instead of only where the toggle is mounted.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      _id,
      set_id,
      name,
      setName,
      myEmail,
      setMyEmail,
      roomId,
      setRoomId,
      video,
      setVideo,
      audio,
      setAudio,
      theme,
      setTheme
    }),
    [
      _id,
      set_id,
      name,
      setName,
      myEmail,
      setMyEmail,
      roomId,
      setRoomId,
      video,
      setVideo,
      audio,
      setAudio,
      theme,
      setTheme
    ]
  );

  return (
    <MyGlobalContext.Provider value={contextValue}>
      {children}
    </MyGlobalContext.Provider>
  );
};
