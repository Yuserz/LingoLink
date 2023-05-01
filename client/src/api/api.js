import axios from 'axios';

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

//POST

// Register a user
export const register = payload => api.post('/api/users/register', payload);
// Create login session
export const login = payload => api.post('/api/users/login', payload);
// Find user by email
export const search = payload => api.post('/api/users/search', payload);
//Add contact
export const addContact = payload => api.post('/api/users/addContact', payload);


//GET

//get all current user data
export const getData = payload => api.get('/api/users/getUserData', payload);

//get Duo roomId
export const getRoomId = payload => api.post('/api/users/getRoomId', payload);

//get Group RoomID