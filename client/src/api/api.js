import axios from "axios";

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Register a user
export const register = (payload) => api.post("/api/users/register", payload);
// Create login session
export const login = (payload) => api.post("/api/users/login", payload);
// Find user by email
export const search = (payload) => api.post("/api/users/search", payload);

//create new contact
export const addContact = (payload, _id) =>
  api.post(`/api/users/contacts/${_id}`, payload);

//Get contact list
export const getContact = (payload, _id) =>
  api.get(`/api/users/contacts/${_id}`, payload);

  //Get contact list
// export const checkContact = (payload, _id) =>
// api.get(`/api/users/contacts/sse/${_id}`, payload);

//get roomId
export const getRoomId = (payload) => api.post("/api/users/room", payload);

//get all current user data
export const getData = (payload) => api.get("/api/users/getUserData", payload);
