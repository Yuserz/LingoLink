import axios from 'axios';

// Create an axios instance with the base URL of the Express server
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

const config = {
  headers: {
    "Content-Type": "application/json",
    "accept":"application/json"
  },
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get all data
export const getData = () => api.get('/api/users');

// Create a new data item/session
export const createData = payload => api.post('/api/users', payload);

// Update an existing data item
export const updateData = (id, payload) => api.put(`/api/users/${id}`, payload);

// Delete an existing data item
export const deleteData = id => api.delete(`/api/users/${id}`);

// Create login session
export const login = payload => api.post('/api/login', payload, config);
