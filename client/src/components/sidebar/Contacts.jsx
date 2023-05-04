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
  const { setShowMessaging, setContactName } = useContext(MyDataContext);

  const fetchRoomId = useCallback(async () => {
    try {
      const response = await getRoomId({
        userId: _id,
        email: email,
      });
      // console.log("response", response.data.roomId);
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
    } else {
      setShowMessaging(false);
    }
  }, [roomId, setShowMessaging]);

  useEffect(() => {
    if (_id && email && fetchRoomId) {
      fetchRoomId();
    } else {
      console.log("");
    }
  }, [email, _id, fetchRoomId]);

  return (
    <div className="flex flex-col gap-2  border-gray-300/80 border-t pt-2">
      {loading ? ( // show a loading indicator or a message if data is being fetched
        <h1>Loading contacts...</h1>
      ) : contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <button
            className="flex gap-2 px-3 p-1 hover:shadow-sm hover:border-2 hover:border-primary/20 rounded-md "
            key={index}
            onClick={() => {
              setEmail(contact.email);
            }}
          >
            <h2>{index + 1 + "."}</h2>
            <h2>{contact.name}</h2>
            {/* <h2>{contact.email}</h2> */}
          </button>
        ))
      ) : (
        <h1 className="opacity-70">No contact</h1>
      )}
    </div>
  );
}
