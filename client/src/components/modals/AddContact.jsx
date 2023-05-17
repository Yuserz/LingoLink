import React, { useState, useContext, useEffect } from "react";
import { search, addContact } from "../../api/api";
import { MyDataContext } from "../../pages/Home";
import Search from "../Search";
import { MyGlobalContext } from "../../context/MyGlobalContext";
//icons
import close from "../../assets/icons/close.svg";
import addContactIcon from "../../assets/icons/add.svg";
import notFoundIcon from "../../assets/icons/notFound.svg";
import existIcon from "../../assets/icons/existingContact.svg";

const { v4: uuidv4 } = require("uuid");

export default function AddContact({ closeModal }) {
  const [foundEmail, setFoundEmail] = useState(false);
  const [showAddSelf, setShowAddSelf] = useState(false);
  const [friendsAlready, setFriendsAlready] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [searchEmail, setSearchEmail] = useState();
  const [loading, setLoading] = useState(false); // New loading state
  const genaratedRoomId = uuidv4();

  const { setShowMessaging, setContactData, contactData } =
    useContext(MyDataContext);
  const { _id, roomId, setRoomId, name, email } = useContext(MyGlobalContext);

  const myId = _id;

  useEffect(() => {
    setRoomId(genaratedRoomId);
  }, []);

  const findContact = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await search({ email: searchEmail });
      console.log("Contact Found!");
      setShowNotFound(false);
      setContactData(response.data);
      setFoundEmail(response.data.email);
    } catch (error) {
      console.log("not found");
      setShowNotFound(true);
      setFoundEmail(false);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const addNewContact = async () => {
    setLoading(true);
    try {
      const response = await addContact(
        { name: contactData.name, email: contactData.email, roomId: roomId },
        _id
      );

      //add this user to contacts contact list
      if (response.status) {
        await addContact(
          { name: name, email: email, roomId: roomId },
          contactData._id
        );

        if (response) {
          setShowMessaging(true);
          closeModal(false);
        }
      } else {
        console.log("error: same id");
      }
    } catch (error) {
      const err = error.response.status;

      //cannot add self
      if (err === 400) {
        setShowAddSelf(true);

        setFriendsAlready(false);
        setShowNotFound(false);
        setFoundEmail(false);
      }
      //conatact not found
      if (err === 404) {
        setShowNotFound(true);

        setShowAddSelf(false);
        setFriendsAlready(false);
        setFoundEmail(false);
      }
      //contact exist
      if (err === 409) {
        setFriendsAlready(true);

        setShowAddSelf(false);
        setShowNotFound(false);
        setFoundEmail(false);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Delay for 3 seconds before setting loading state back to false
    }
  };

  return (
    <div className="absolute z-50 w-screen h-screen bg-black/70 top-0 left-0 flex items-center justify-center">
      <div className="add-contact-modal flex flex-col w-[500px] h-fit border-2 border-gray-500 bg-secondary dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg p-4 gap-2">
        <div className="flex justify-end px-1 py-2 text-lg">
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="exit-btn"
          >
            <img src={close} alt="" />
          </button>
        </div>
        <div
          className={`grid grid-rows-2 px-4 items-center overflow-hidden ${
            foundEmail ? "flex-col gap-6" : ""
          }`}
        >
          <div className="w-full h-fit row-span-full mb-4">
            <h1 className="font-semibold text-black/70 w-full text-center mb-6 text-xl uppercase">
              Add Contact
            </h1>
            <Search setSearchEmail={setSearchEmail} findContact={findContact} />
          </div>

          {loading ? (
            <div className="w-full h-20 flex justify-center items-center my-8">
              <h2 className="text-center"> loading...</h2>
            </div>
          ) : foundEmail && !friendsAlready ? (
            <div>
              <h2 className="opacity-30 text-sm ml-1 py-2 border-gray-400 border-y">
                Result
              </h2>
              <button
                onClick={() => {
                  addNewContact();
                }}
                className="search-results w-full bg-primary text-white border-2 my-4 mb-6 hover:scale-[101%] border-gray-300  hover:border-gray-500 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm"
              >
                {foundEmail}
                <div className="flex justify-center bg-white p-1 rounded-md shadow-sm hover:scale-110">
                  <img
                    className="w-4 h-4 ml-[.5px] opacity-70 "
                    src={addContactIcon}
                    alt=""
                  />
                </div>
              </button>
            </div>
          ) : friendsAlready ? (
            <div className="text-center my-4 mb-8  opacity-80 flex flex-col justify-center w-full items-center">
              <img className="w-20" src={existIcon} alt="" />{" "}
              <h3 className="opacity-50">Contact already exist!</h3>
            </div>
          ) : (
            ""
          )}
          {!loading && showNotFound ? (
            <div className="text-center my-8 opacity-80 flex flex-col justify-center w-full items-center">
              <img className="w-20" src={notFoundIcon} alt="" />{" "}
              <h3 className="opacity-50">Contact not found!</h3>
            </div>
          ) : (
            ""
          )}
          {!loading && showAddSelf ? (
            <div className="text-center my-8 opacity-80 flex flex-col justify-center w-full items-center">
              <img className="w-20" src={notFoundIcon} alt="" />{" "}
              <h3 className="opacity-50">Cannot add self!</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
