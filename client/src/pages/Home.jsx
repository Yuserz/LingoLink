import React, { createContext, useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";

//Context API for state management
export const MyContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("contact info:", data);
  }, [data]);

  return (
    <MyContext.Provider value={{ showMessaging, setShowMessaging, setData }}>
      <MainLayout>
        {showMessaging ? <Messaging data = { data }  openMessaging={setShowMessaging} /> : ""}
      </MainLayout>
    </MyContext.Provider>
  );
}
