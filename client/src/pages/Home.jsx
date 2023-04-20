import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";

export const MyContext = React.createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(false);
  return (
    <MainLayout>
      <MyContext.Provider value={{ showMessaging, setShowMessaging }}>
        {showMessaging ? <Messaging openMessaging={setShowMessaging} /> : ""}
      </MyContext.Provider>
    </MainLayout>
  );
}
