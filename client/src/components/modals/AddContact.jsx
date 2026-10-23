import React, { useState, useContext, useEffect, useRef } from "react";
import { search, addContact } from "../../api/api";
import { MyDataContext } from "../../context/MyDataContext";
import Search from "../Search";
import { MyGlobalContext } from "../../context/MyGlobalContext";
import Swal from "sweetalert2";

//icons
import close from "../../assets/icons/close.svg";
import addContactIcon from "../../assets/icons/add.svg";
import notFoundIcon from "../../assets/icons/notFound.svg";
import existIcon from "../../assets/icons/existingContact.svg";

const { v4: uuidv4 } = require("uuid");

export default function AddContact({ closeModal, updateContact }) {
  const [foundEmail, setFoundEmail] = useState(false);
  const [showAddSelf, setShowAddSelf] = useState(false);
  const [friendsAlready, setFriendsAlready] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [searchEmail, setSearchEmail] = useState();
  const [loading, setLoading] = useState(false);
  // Guards the whole submit against synchronous double-clicks (two rapid
  // clicks share one render, so a loading state alone cannot block them).
  const addingRef = useRef(false);

  const { setShowMessaging, setContactData, setContactName, contactData } =
    useContext(MyDataContext);
  const { _id, roomId, setRoomId, name, myEmail } = useContext(MyGlobalContext);

  useEffect(() => {
    setRoomId(uuidv4());
  }, [setRoomId]);

  // Clear every result panel before a new attempt
  const resetResults = () => {
    setShowNotFound(false);
    setShowAddSelf(false);
    setFriendsAlready(false);
    setFoundEmail(false);
    setRequestError(false);
  };

  const findContact = async () => {
    try {
      setLoading(true); // Set loading state to true
      resetResults();
      const response = await search({ email: searchEmail });

      if (response.status === 200) {
        setContactData(response.data);
        setFoundEmail(response.data.email);
      } else {
        setShowNotFound(true);
      }
    } catch (error) {
      // error.response is undefined when the request never reached the server
      const status = error?.response?.status;

      if (status === 401) {
        //search not found
        setShowNotFound(true);
        setRequestError(false);
      } else {
        setShowNotFound(false);
        setRequestError(true);
      }
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const addNewContact = async () => {
    if (addingRef.current) return;
    addingRef.current = true;
    setLoading(true);
    resetResults();
    try {
      const response = await addContact(
        { name: contactData.name, email: contactData.email, roomId: roomId },
        _id
      );

      //add this user to the added contacts contact list
      if (response.status === 201) {
        await addContact(
          { name: name, email: myEmail, roomId: roomId },
          contactData._id
        );
        // Open the chat with the new contact right away instead of dropping
        // the user back on the "Start a chat" screen.
        setContactName(contactData.name);
        setShowMessaging(true);
        updateContact(new Date());

        closeModal(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contact is added!",
          timer: 1200,
        });
      }
    } catch (error) {
      // error.response is undefined when the request never reached the server
      const err = error?.response?.status;

      //cannot add self
      if (err === 400) {
        setShowAddSelf(true);
        setRequestError(false);
      } else if (err === 404) {
        //conatact not found
        setShowNotFound(true);
        setRequestError(false);
      } else if (err === 409) {
        //contact exist
        setFriendsAlready(true);
        setRequestError(false);
      } else {
        // network failure or an unexpected status: tell the user instead of failing silently
        setRequestError(true);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        addingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="absolute z-50 w-screen h-screen bg-black/70 dark:bg-black/80 top-0 left-0 flex items-center justify-center">
      <div className="add-contact-modal flex flex-col w-[500px] max-w-[calc(100vw-2rem)] h-fit border-2 border-gray-500 bg-secondary dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg p-4 gap-2">
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
            <h1 className="font-semibold text-black/70 w-full text-center mb-6 text-xl uppercase dark:text-white">
              Add Contact
            </h1>
            <Search setSearchEmail={setSearchEmail} findContact={findContact} />
          </div>

          {loading ? (
            <div className="w-full h-20 flex justify-center items-center my-8">
              <h2 className="text-center dark:text-white/90"> loading...</h2>
            </div>
          ) : foundEmail && !friendsAlready ? (
            <div>
              <h2 className="text-black/30 text-sm ml-1 py-2 border-gray-400/70 border-y dark:border-gray-400/50   dark:text-white/70">
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
              <h3 className="opacity-60 dark:text-white/90">
                Contact already exist!
              </h3>
            </div>
          ) : (
            ""
          )}
          {!loading && showNotFound ? (
            <div className="text-center my-8 opacity-80 flex flex-col justify-center w-full items-center">
              <img className="w-20" src={notFoundIcon} alt="" />{" "}
              <h3 className="opacity-60 dark:text-white/90">
                Contact not found!
              </h3>
            </div>
          ) : (
            ""
          )}
          {!loading && showAddSelf ? (
            <div className="text-center my-8 opacity-80 flex flex-col justify-center w-full items-center">
              <img className="w-20" src={notFoundIcon} alt="" />{" "}
              <h3 className="opacity-60 dark:text-white/90">
                Cannot add self!
              </h3>
            </div>
          ) : (
            ""
          )}
          {!loading && requestError ? (
            <div className="text-center my-8 flex flex-col justify-center w-full items-center">
              <h3 className="opacity-80 dark:text-white/90">
                Something went wrong.
              </h3>
              <h3 className="opacity-60 dark:text-white/70">
                Please check your connection and try again.
              </h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
