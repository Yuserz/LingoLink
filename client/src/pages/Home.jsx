import React, { createContext, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";

//Context API for state management
export const MyContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(false);
  return (
    <MyContext.Provider value={{ showMessaging, setShowMessaging }}>
      <MainLayout>
        {showMessaging ? <Messaging openMessaging={setShowMessaging} /> : ""}
      </MainLayout>
    </MyContext.Provider>
  );
}
