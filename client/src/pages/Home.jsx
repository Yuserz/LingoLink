import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import Chat from "../components/Chat";
import { MyDataContext } from "../context/MyDataContext";

// Icon
import msg from "../assets/icons/msg.svg";

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(
    sessionStorage.getItem("showMessaging") === "true" || false
  );
  const [showVideoCall, setShowVideoCall] = useState(
    sessionStorage.getItem("showVideoCall") === "true" || false
  );
  const [contactData, setContactData] = useState(
    sessionStorage.getItem("contactData") || ""
  );
  const [contactName, setContactName] = useState(
    sessionStorage.getItem("contactName") || ""
  );

  // Cache the data with useMemo
  const cachedData = useMemo(
    () => ({
      contactName,
      setContactName,
      showMessaging,
      setShowMessaging,
      showVideoCall,
      setShowVideoCall,
      contactData,
      setContactData,
    }),
    [
      contactName,
      setContactName,
      showMessaging,
      setShowMessaging,
      showVideoCall,
      setShowVideoCall,
      contactData,
      setContactData,
    ]
  );

  useEffect(() => {
    sessionStorage.setItem("showMessaging", showMessaging);
    sessionStorage.setItem("showVideoCall", showVideoCall);
    sessionStorage.setItem("contactData", contactData);
    sessionStorage.setItem("contactName", contactName);
  }, [showMessaging, showVideoCall, contactData, contactName]);

  return (
    <MyDataContext.Provider value={cachedData}>
      <MainLayout>
        {contactName ? (
          <Chat />
        ) : (
          <div className="start-messaging flex justify-center items-center h-full w-full">
            <main className="flex flex-col">
              <img className="w-[100px] h-auto" src={msg} alt="" />{" "}
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
