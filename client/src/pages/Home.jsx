import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";
import VideoCall from "../components/VideoCall";
import { getData } from "../api/api";
import { MyGlobalContext } from "../context/MyGlobalContext";

//Context API for state management
export const MyDataContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(
    localStorage.getItem("showMessaging") === "true" ? true : false
  );
  const [showVideoCall, setShowVideoCall] = useState(
    localStorage.getItem("showVideoCall") === "true" ? true : false
  );
  const [userData, setUserData] = useState("");
  const [contactData, setContactData] = useState("");
  const { _id } = useContext(MyGlobalContext);

  // useEffect(() => {
  //   console.log(contactData);
  // }, [contactData]);

  // Use memoized version of fetchData
  const fetchData = useCallback(async () => {
    try {
      const response = await getData({ _id });
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, [_id]);

  // console.log(userData);

  // Cache the data with useMemo
  const cachedData = useMemo(
    () => ({
      userData,
      showMessaging,
      setShowMessaging,
      setUserData,
      showVideoCall,
      setShowVideoCall,
      contactData,
      setContactData,
    }),
    [
      userData,
      showMessaging,
      setShowMessaging,
      setUserData,
      showVideoCall,
      setShowVideoCall,
      contactData,
      setContactData,
    ]
  );

  useEffect(() => {
    localStorage.setItem("showMessaging", showMessaging);
    localStorage.setItem("showVideoCall", showVideoCall);
  }, [showMessaging, showVideoCall]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MyDataContext.Provider value={cachedData}>
      <MainLayout>
        {showMessaging ? <Messaging userId={_id} userdata={userData} contactData={contactData} /> : ""}
        {showVideoCall ? <VideoCall /> : ""}
      </MainLayout>
    </MyDataContext.Provider>
  );
}
