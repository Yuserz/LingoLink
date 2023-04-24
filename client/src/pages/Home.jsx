import React, { createContext, useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import Messaging from "../components/Messaging";
import { getData } from "../api/api";
import { MyId } from "../pages/Login"

//Context API for state management
export const MyContext = createContext();

export default function Home() {
  const [showMessaging, setShowMessaging] = useState(false);
  const [data, setData] = useState();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = getData({
          _id: MyId,
        });
        setData(response);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    console.log("data:", MyId);
  }, []);

  return (
    <MyContext.Provider value={{ showMessaging, setShowMessaging, setData }}>
      <MainLayout>
        {showMessaging ? (
          <Messaging data={data} openMessaging={setShowMessaging} />
        ) : (
          ""
        )}
      </MainLayout>
    </MyContext.Provider>
  );
}
