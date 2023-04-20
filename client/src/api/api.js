import axios from 'axios';

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

//Enforced using helmet
// //http header
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     "accept":"application/json"
//   },
// }

// Register a user
export const register = payload => api.post('/api/users/register', payload);

// Create login session
export const login = payload => api.post('/api/users/login', payload);

// Find user by email
export const add = payload => api.post('/api/users/add', payload);
