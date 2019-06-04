import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spotanalysis-back.herokuapp.com/',
});

export default api;
