import React, { useState, useContext } from "react";
import { search, addContact } from "../../api/api";
import { MyDataContext } from "../../pages/Home";
import Search from "../Search";

//icons
import close from "../../assets/icons/close.svg";
import plus from "../../assets/icons/add.svg";

export default function AddContact({ closeModal }) {
  const [email, setEmail] = useState();
  // const [contact, setContact] = useState();
  const [foundEmail, setFoundEmail] = useState();
  const { setShowMessaging, setContactData } = useContext(MyDataContext);

  const findContact = async () => {
    try {
      const response = await search({
        email,
      });
      //store user info to data
      // console.log(response.data)
      setContactData(response.data);

      console.log("success:", response.data);
    } catch (error) {
      console.log("not found");
    }
    setFoundEmail(email);
  };

  // const handleClick = async () => {
  //   try {
  //     const response = await addContact({
  //       name,
  //       email
  //     });
  //     setContact(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              // handleClick(email);
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
