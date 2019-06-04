import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACK_END_URI || 'http://localhost:8888',
});

export default api;
