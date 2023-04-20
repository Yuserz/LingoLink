import React, { useState, useContext } from "react";
import Search from "../../Search";
import close from "../../../assets/icons/close.svg";
import { add } from "../../../api/api";
import { MyContext } from "../../../pages/Home";


export default function AddContact({ closeModal }) {
  const [email, setEmail] = useState();
  // const [message, setMessage] = useState();

  const findContact = async () => {
    // e.preventDefault();

    try {
      const response = await add({
        email,
      });

      console.log("Object:", response);
    } catch (error) {
      console.log("not found");
    }
  };

  const { setShowMessaging } = useContext(MyContext);

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
        <div className="search-results">
          <button onClick={() => {setShowMessaging(true)}}>{email}</button>
        </div>
      </div>
    </div>
  );
}
