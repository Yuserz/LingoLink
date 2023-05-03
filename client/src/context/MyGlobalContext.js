import React, { createContext, useState, useMemo, useEffect } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState(sessionStorage.getItem("_id") || "");
  const [roomId, setRoomId] = useState(sessionStorage.getItem("roomId") || null);

  useEffect(() => {
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("roomId", roomId);
    setRoomId(setRoomId)
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
