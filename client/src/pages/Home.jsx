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
import { MyIdContext } from "../context/MyIdContext";

//Context API for state management
export const MyDataContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(
    localStorage.getItem("showMessaging") === "true" ? true : false
  );
  const [showVideoCall, setShowVideoCall] = useState(
    localStorage.getItem("showVideoCall") === "true" ? true : false
  );
  const [data, setData] = useState("");
  const { _id } = useContext(MyIdContext);

  // Use memoized version of fetchData
  const fetchData = useCallback(async () => {
    try {
      const response = await getData({ _id });
      const data = response.data;
      setData(data || "");
    } catch (error) {
      console.log(error);
    }
  }, [_id]);

  // Cache the data with useMemo
  const cachedData = useMemo(
    () => ({
      data,
      showMessaging,
      setShowMessaging,
      setData,
      showVideoCall,
      setShowVideoCall,
    }),
    [
      data,
      showMessaging,
      setShowMessaging,
      setData,
      showVideoCall,
      setShowVideoCall,
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
        {showMessaging ? (
          <Messaging data={data} openMessaging={setShowMessaging} />
        ) : (
          ""
        )}
        {showVideoCall ? <VideoCall /> : ""}
      </MainLayout>
    </MyDataContext.Provider>
  );
}
