import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";
import { getData } from "../api/api";
import { MyIdContext } from "../context/MyIdContext";

//Context API for state management
export const MyDataContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(false);
  const [data, setData] = useState();
  const { _id } = useContext(MyIdContext);

  // Use memoized version of fetchData
  const fetchData = useCallback(async () => {
    try {
      const response = await getData({ _id });
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, [_id]);

  // Cache the data with useMemo
  const cachedData = useMemo(() => ({ data, showMessaging, setShowMessaging, setData }), [data, showMessaging, setShowMessaging, setData]);

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
      </MainLayout>
    </MyDataContext.Provider>
  );
}
