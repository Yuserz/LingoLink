import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyGlobalContext } from "../../../context/MyGlobalContext";
import { MyDataContext } from "../../../pages/Home";
import { getRoomId } from "../../../api/api";

export default function Contacts({ contacts, loading }) {
  const [email, setEmail] = useState(
    sessionStorage.getItem("email") === "true" ? true : false
  );
  const { _id, roomId, setRoomId } = useContext(MyGlobalContext);
  const { setShowMessaging, setShowVideoCall, setContactName, setContactData } =
    useContext(MyDataContext);

  const fetchRoomId = useCallback(async () => {
    try {
      const response = await getRoomId({
        userId: _id,
        email: email,
      });
      setContactData(response.data);
      // console.log("response", response.data);
      if (response) {
        const { roomId, name } = response.data;
        setRoomId(roomId);
        setContactName(name);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [email]);

  useEffect(() => {
    if (roomId) {
      setShowMessaging(true);
      setShowVideoCall(false);
    }
  }, [roomId, setShowMessaging, setShowVideoCall]);

  useEffect(() => {
    if (_id && email) {
      fetchRoomId();
    }
  }, [email, _id, fetchRoomId]);

  return (
    <div className="flex flex-col">
      {loading ? ( // show a loading indicator or a message if data is being fetched
        ""
      ) : contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <button
            className="flex items-center gap-2 p-2 px-4  hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-[101%]"
            key={index}
            onClick={() => {
              setEmail(contact.email);
            }}
          >
            <div className="flex bg-primary items-center justify-center border-2 w-12 h-12 rounded-full ">
              <h1 className="uppercase  text-white font-semibold">
                {contact.name.charAt(0)}
              </h1>
            </div>

            <h2 className="opacity-70 dark:text-white">{contact.email}</h2>
          </button>
        ))
      ) : (
        <h1 className="text-black/30 text-center dark:text-white/30 mt-2">
          Start adding contacts
        </h1>
      )}
    </div>
  );
}
