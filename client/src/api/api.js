import axios from 'axios';

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

//http header(not yet inforced)
const config = {
  headers: {
    "Content-Type": "application/json",
    "accept":"application/json"
  },
}

// Register a user
export const register = payload => api.post('/api/users/register', payload, config);

// Create login session
export const login = payload => api.post('/api/users/login', payload, config);
