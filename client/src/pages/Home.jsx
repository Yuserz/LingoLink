import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";
import VideoCall from "../components/VideoCall";
import { MyGlobalContext } from "../context/MyGlobalContext";

//Context API for state management
export const MyDataContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(
    sessionStorage.getItem("showMessaging") === "true" ? true : false
  );
  const [showVideoCall, setShowVideoCall] = useState(
    sessionStorage.getItem("showVideoCall") === "true" ? true : false
  );
  // const [contactData, setContactData] = useState( );
  const [contactData, setContactData] = useState(
    sessionStorage.getItem("contactName") === "true" ? true : false
  );
  const [contactName, setContactName] = useState(
    sessionStorage.getItem("contactName") === "true" ? true : false
  );

  const { _id, userData } = useContext(MyGlobalContext);

  useEffect(() => {
    console.log({ contactData: contactData, userData: userData });
  }, [contactData, userData]);

 
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
      showVideoCall,
      setShowVideoCall,
      contactData,
      setContactData,
    ]
  );

  useEffect(() => {
    sessionStorage.setItem("showMessaging", showMessaging);
    sessionStorage.setItem("showVideoCall", showVideoCall);
  }, [showMessaging, showVideoCall]);

  // useEffect(() => {
  //   fetchData();
  // }, [_id]);

  return (
    <MyDataContext.Provider value={cachedData}>
      <MainLayout>
        {showMessaging ? <Messaging userId={_id} /> : ""}
        {showVideoCall ? <VideoCall /> : ""}
      </MainLayout>
    </MyDataContext.Provider>
  );
}
