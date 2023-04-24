import React, { createContext, useState } from "react";

export const MyIdContext = createContext({
  _id: "",
  set_id: () => {},
});

export const MyContextProvider = ({ children }) => {
  const [_id, set_id] = useState("");

  return (
    <MyIdContext.Provider value={{ _id, set_id }}>
      {children}
    </MyIdContext.Provider>
  );
};
