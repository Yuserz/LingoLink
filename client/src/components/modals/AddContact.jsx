import React, { useState, useContext, useEffect } from "react";
import { search, addContact } from "../../api/api";
import { MyDataContext } from "../../pages/Home";
import Search from "../Search";
import { MyGlobalContext } from "../../context/MyGlobalContext";
//icons
import close from "../../assets/icons/close.svg";
import plus from "../../assets/icons/add.svg";

const { v4: uuidv4 } = require("uuid");

export default function AddContact({ closeModal }) {
  const [foundEmail, setFoundEmail] = useState();
  const [email, setEmail] = useState();

  const genaratedRoomId = uuidv4();

  const { setShowMessaging, setContactData, contactData } =
    useContext(MyDataContext);
  const { _id, roomId, setRoomId, userData } = useContext(MyGlobalContext);

  useEffect(() => {
    setRoomId(genaratedRoomId);
  }, []);

  const findContact = async () => {
    try {
      const response = await search({
        email,
      });
      //store user info to data
      setContactData(response.data);
      console.log("Contact Found!");
    } catch (error) {
      console.log("not found");
    }
    setFoundEmail(email);
  };

  //Add new contact

  const addNewContact = async () => {
    if (userData.email !== foundEmail) {
      try {
        const response = await addContact(
          {
            name: contactData.name,
            email: contactData.email,
            roomId: roomId,
          },
          _id
        );
        // console.log("1 New contact added!", response);

        //Add also this current user to contact list of the resent added contact
        // console.log("userData:", userData)

        if (_id !== contactData._id) {
          const res = addContact(
            {
              name: userData.name,
              email: userData.email,
              roomId: roomId,
            },
            contactData._id
          );
        } else {
          console.log("error: same id");
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      console.log("cannot add self as contact");
    }
  };

  // useEffect(() => {
  //   console.log(userData);
  // }, []);

  return (
    <div className="absolute w-screen h-screen bg-black/20 top-0 left-0 flex items-center justify-center">
      <div className="add-contact-modal flex flex-col w-[500px] h-[400px] bg-secondary rounded-xl overflow-hidden shadow-sm p-4 gap-4">
        <div className="flex justify-between px-1 text-lg">
          <h1 className="font-semibold text-black2">Add Contact</h1>

          <button
            onClick={() => {
              closeModal(false);
            }}
            className="exit-btn"
          >
            <img src={close} alt="" />
          </button>
        </div>
        <div className="h-12 overflow-hidden ">
          <Search setEmail={setEmail} findContact={findContact} />
        </div>

        {foundEmail ? (
          <button
            onClick={() => {
              setShowMessaging(true);
              addNewContact();
              closeModal(false);
            }}
            className="search-results bg-white border-2 border-primary/50 hover:border-primary/100 px-4 py-3 rounded-lg flex justify-between items-center"
          >
            {foundEmail}
            <img className="w-4 h-4" src={plus} alt="" />
          </button>
        ) : (
          []
        )}
      </div>
    </div>
  );
}
