import React from "react";

export default function ContactList({ contacts, loading }) {
  return (
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
  );
}
