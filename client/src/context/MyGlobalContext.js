import React, { createContext, useState, useMemo, useEffect } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState(localStorage.getItem("_id") || "");
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || null);

  useEffect(() => {
    localStorage.setItem("_id", _id);
    localStorage.setItem("roomId", roomId);
  }, [_id, roomId]);

  const contextValue = useMemo(() => ({ _id, set_id, roomId, setRoomId }), [
    _id,
    set_id,
    roomId,
    setRoomId,
  ]);

  return (
    <MyGlobalContext.Provider value={contextValue}>
      {children}
    </MyGlobalContext.Provider>
  );
};
