import React, { useState, useContext, useEffect } from "react";
import arrowDown from "../../assets/icons/arrowDown.svg";
import add from "../../assets/icons/add.svg";
import AddContact from "../modals/AddContact";
import { getContact } from "../../api/api";
import { MyGlobalContext } from "../../context/MyGlobalContext";

export default function Chat() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // introduce a loading state
  const { _id } = useContext(MyGlobalContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // set loading to true before making the API call
      const response = await getContact({}, _id);
      if (response.status === 200) {
        setContacts(response.data.contacts);
      } else {
        setContacts([]);
      }
      setLoading(false); // set loading to false after the response is received
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (contacts) {
  //     console.log(contacts);
  //   }
  // }, [contacts]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`chat-container gap-3  bg-secondary rounded-md p-3 px-4 flex flex-col justify-between${
        expanded ? "expanded min-h-[150px] max-h-fit" : ""
      }`}
    >
      <div
        className={`flex items-center w-full justify-between h-fit  ${
          expanded ? "pb-2 border-gray-300/80 border-b " : ""
        }`}
      >
        <button
          onClick={toggleExpanded}
          className="add-btn flex gap-2 items-center h-fit"
        >
          <img
            className={`${expanded ? "rotate-180" : ""}`}
            src={arrowDown}
            alt=""
          />
          <h2>Chat</h2>
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="dropDown-btn h-fit"
        >
          <img src={add} alt="" />
        </button>

        {showModal ? <AddContact closeModal={setShowModal} /> : null}
      </div>
      <div className="flex flex-col gap-2  border-gray-300/80 border-t pt-2">
        {loading ? ( // show a loading indicator or a message if data is being fetched
          <h1>Loading contacts...</h1>
        ) : contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <button
              className="flex gap-2 px-3 p-1 hover:shadow-sm hover:border-2 hover:border-primary/20 rounded-md "
              key={index}
            >
              <h2>{index + 1 + "."}</h2>
              <h2>{contact.name}</h2>
            </button>
          ))
        ) : (
          <h1 className="opacity-70">No contact</h1>
        )}
      </div>
    </div>
  );
}
