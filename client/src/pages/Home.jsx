import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import Chat from "../components/Chat";
import { MyGlobalContext } from "../context/MyGlobalContext";

// Icon
import msg from "../assets/icons/msg.svg";

// Create a context for the data
export const MyDataContext = createContext();

export default function Home() {
  const { _id } = useContext(MyGlobalContext);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [contactData, setContactData] = useState("");
  const [contactName, setContactName] = useState("");

  // Cache the data with useMemo
  const cachedData = useMemo(() => ({
    contactName,
    setContactName,
    showMessaging,
    setShowMessaging,
    showVideoCall,
    setShowVideoCall,
    contactData,
    setContactData,
  }), [contactName, setContactName, showMessaging, setShowMessaging, showVideoCall, setShowVideoCall, contactData, setContactData]);

  useEffect(() => {
    sessionStorage.setItem("showMessaging", showMessaging);
    sessionStorage.setItem("contactName", contactName);
    sessionStorage.setItem("contactData", contactData);
    sessionStorage.setItem("showVideoCall", showVideoCall);
  }, [showMessaging, contactName, contactData, showVideoCall]);

  return (
    <MyDataContext.Provider value={cachedData}>
      <MainLayout>
        {contactData !== null ? <Chat userId={_id} /> : null}
        {contactData === null && (
          <div className="start-messaging flex justify-center items-center h-full w-full">
            <main className="flex flex-col">
              <img className="w-[100px] h-auto]" src={msg} alt="" />{" "}
              <h2 className="text-center text-black opacity-30 dark:text-white">
                Start a chat
              </h2>
            </main>
          </div>
        )}
      </MainLayout>
    </MyDataContext.Provider>
  );
}
