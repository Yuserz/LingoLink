import React, { useState, useContext, useEffect } from "react";
import arrowDown from "../../assets/icons/arrowDown.svg";
import arrowDownWhite from "../../assets/icons/arrowDownWhite.svg";
import add from "../../assets/icons/add.svg";
import AddContact from "../modals/AddContact";
import { getContact } from "../../api/api";
import { MyGlobalContext } from "../../context/MyGlobalContext";
import ContactList from "./Contacts";

export default function ChatList() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id, theme } = useContext(MyGlobalContext);
  const [showContacts, setShowContacts] = useState(true);
  const [latestContact, setLatestContact] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getContact({}, _id);
      if (response.status === 200) {
        setContacts(response.data.contacts);
        setLatestContact(response.data.latestContact); // Set the latest contact
      } else {
        setContacts([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [latestContact]); // Add latestContact as a dependency

  const toggleExpanded = () => {
    setShowContacts(!showContacts);
  };

  return (
    <div
      className={`chat-container dark:text-black overflow-hidden dark:border-gray-700  dark:bg-gray-500/50 bg-secondary rounded-md py-4 flex flex-col justify-between${
        showContacts ? "expanded max-h-fit gap-4" : "hidden"
      }`}
    >
      <div
        className={`flex items-center w-full justify-between h-fit px-4 py-1 ${
          showContacts ? "pb-2 border-b border-gray-700/15" : ""
        }`}
      >
        <button
          onClick={toggleExpanded}
          className={`add-btn  flex items-center h-fit`}
        >
          <img
            className={`p-2 transition ease-in-out duration-300 dark:bg-primary/90 border rounded-md mr-1 ${
              showContacts ? "rotate-180 " : ""
            }`}
            src={theme === "dark" ? arrowDownWhite : arrowDown}
            alt=""
          />
          <h2 className="dark:text-white text-end">Chat</h2>
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="dropDown-btn h-fit"
        >
          <div className="flex justify-center p-1 rounded-md hover:scale-110">
            <img className="w-4 h-4 ml-[.5px] " src={add} alt="" />
          </div>
        </button>

        {showModal ? (
          <AddContact
            closeModal={setShowModal}
            updateContact={setLatestContact}
          />
        ) : null}
      </div>
      {showContacts ? (
        <ContactList contacts={contacts} loading={loading} />
      ) : (
        ""
      )}
    </div>
  );
}
