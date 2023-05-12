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
  const { _id, roomId, setRoomId, name } = useContext(MyGlobalContext);

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
    if (name.email !== foundEmail) {
      try {
        const response = await addContact(
          {
            name: contactData.name,
            email: contactData.email,
            roomId: roomId,
          },
          _id
        );
        if (_id !== contactData._id) {
          const response = addContact(
            {
              name: name,
              email: email,
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

  return (
    <div className="absolute w-screen h-screen bg-black/70 top-0 left-0 flex items-center justify-center">
      <div className="add-contact-modal flex flex-col w-[500px] min-h-[200px] border-2 border-gray-500 bg-secondary rounded-xl overflow-hidden shadow-lg p-4 gap-2">
        <div className="flex justify-between px-1 py-2 text-lg">
          <h1 className="font-semibold text-black2">Add Contact</h1>

          <button
            onClick={() => {
              closeModal(false);
            }}
            className="exit-btn"
          >
            <img src={close} alt="" />
          </button>logi
        </div>
        <div className="breakLine border border-gray-200"></div>
        <div
          className={`min-h-[150px] flex px-4 items-center overflow-hidden ${
            foundEmail ? "flex-col gap-10" : ""
          }`}
        >
          <div className="w-full ">
            <Search setEmail={setEmail} findContact={findContact} />
          </div>
          {foundEmail ? (
            <button
              onClick={() => {
                setShowMessaging(true);
                addNewContact();
                closeModal(false);
              }}
              className="search-results w-full bg-primary text-white border-2  hover:scale-[101%] border-gray-300  hover:border-gray-500 px-4 py-3 rounded-lg flex justify-between items-center"
            >
              {foundEmail}
              <div className="flex justify-center bg-white p-1 rounded-md shadow-sm hover:scale-110">
                <img className="w-4 h-4 ml-[.5px] opacity-70 " src={plus} alt="" />
              </div>
            </button>
          ) : (
            []
          )}
        </div>
      </div>
    </div>
  );
}
