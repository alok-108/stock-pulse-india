import axios from 'axios';

// Load API base from environment, default to localhost for local testing
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 20s timeout
});

export default api;
