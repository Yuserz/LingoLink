import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyGlobalContext } from "../../context/MyGlobalContext";
import { MyDataContext } from "../../pages/Home";
import { getRoomId } from "../../api/api";

export default function Contacts({ contacts, loading }) {
  const [email, setEmail] = useState(
    sessionStorage.getItem("email") === "true" ? true : false
  );
  // const [email, setEmail] = useState();
  const { _id, roomId, setRoomId } = useContext(MyGlobalContext);
  const { setShowMessaging, setContactName, setContactData } =
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
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    if (roomId) {
      setShowMessaging(true);
    } 
  }, [roomId, setShowMessaging]);

  useEffect(() => {
    if (_id && email) {
      fetchRoomId();
    } 
  }, [email, _id, fetchRoomId]);

  return (
    <div className="flex flex-col gap-2">
      {loading ? ( // show a loading indicator or a message if data is being fetched
        ""
      ) : contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <button
            className="flex items-center gap-2 p-2 px-4 hover:shadow-sm hover:border hover:border-primary/20"
            key={index}
            onClick={() => {
              setEmail(contact.email);
            }}
          >
            <h2 className="border-2 w-8 h-8 rounded-full"></h2>
            <h2 className="opacity-70">{contact.email}</h2>
            {/* <h2>{contact.email}</h2> */}
          </button>
        ))
      ) : (
        <h1 className="opacity-70">No contact</h1>
      )}
    </div>
  );
}
