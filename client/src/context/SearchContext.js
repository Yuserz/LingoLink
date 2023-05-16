import React, { createContext, useState, useContext } from "react";
import { search } from "../api/api";
import { MyDataContext } from "../pages/Home";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [email, setEmail] = useState();
  const [foundEmail, setFoundEmail] = useState();

  const { setContactData } = useContext(MyDataContext);

  const findContact = async () => {
    try {
      const response = await search({
        email,
      });
      // store user info to data
      setContactData(response.data);
      console.log("Contact Found!");
    } catch (error) {
      console.log("not found");
    }
    setFoundEmail(email);
  };

  const searchContextValues = {
    email,
    setEmail,
    foundEmail,
    setFoundEmail,
    findContact,
  };

  return (
    <SearchContext.Provider value={searchContextValues}>
      {children}
    </SearchContext.Provider>
  );
};
