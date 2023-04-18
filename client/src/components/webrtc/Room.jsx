import React, { useState } from "react";
import joinRoom from "./Join";

function Room() {
  const [roomName, setRoomName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactList, setContactList] = useState([]);

  const createRoom = (roomName) => {
    setRoomName(roomName);
    joinRoom(roomName);
  };

  const addContact = () => {
    if (contactEmail) {
      setContactList([...contactList, { email: contactEmail }]);
      setContactEmail("");
    }
  };

  const handleContactClick = (contactEmail) => {
    const roomName = `${contactEmail}-${Date.now()}`;
    createRoom(roomName);
  };

  return (
    <div>
      {/* <h1>Home Page</h1> */}
      {roomName ? (
        <Room roomName={roomName} />
      ) : (
        <div>
          <h2>Contacts:</h2>
          <ul>
            {contactList.map((contact, index) => (
              <li key={index} onClick={() => handleContactClick(contact.email)}>
                {contact.email}
                <button onClick={() => handleContactClick(contact.email)}>
                  Create Room
                </button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="email"
              placeholder="Enter email address"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <button onClick={addContact}>Add Contact</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
