import React, { createContext, useState, useMemo } from "react";

export const MyGlobalContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState("");
  const [roomId, setRoomId] = useState("");

  const contextValue = useMemo(() => ({ _id, set_id, roomId, setRoomId }), [_id, set_id, roomId, setRoomId]);

  return (
    <MyGlobalContext.Provider value={contextValue}>
      {children}
    </MyGlobalContext.Provider>
  );
};
