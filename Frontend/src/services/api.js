import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Will be proxied to http://localhost:5050
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
