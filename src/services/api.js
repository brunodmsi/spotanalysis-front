import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spotanalysis-back.herokuapp.com/',
  // baseURL: 'http://localhost:8888',
});

export default api;
