import React, { useState, useContext, useEffect } from "react";
import arrowDown from "../../assets/icons/arrowDown.svg";
import add from "../../assets/icons/add.svg";
import AddContact from "./modals/AddContact";
import { MyDataContext } from "../../pages/Home";

export default function Chat() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContact] = useState();
  const data = useContext(MyDataContext);

  useEffect(() => {
    if (data.data) {
      console.log(data.data);
      setContact(data.data.contacts);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("contacts:", contacts);
  //   // setContact(data.contacts)
  // }, [contacts]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`chat-container  bg-secondary rounded-md p-3 px-4 flex flex-col justify-between${
        expanded ? "expanded min-h-[150px] max-h-fit" : ""
      }`}
    >
      <div
        className={`flex items-center w-full justify-between h-fit ${
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

        {showModal ? <AddContact closeModal={setShowModal} /> : ""}
      </div>
      <div>
        {contacts
          ? contacts.map((contact, index) => (
              <div key={index}>{contact.name}</div>
            ))
          : []}
      </div>
      {/* {data.data.name} */}
    </div>
  );
}
