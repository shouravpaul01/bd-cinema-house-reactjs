import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Set your desired base URL
});

export default axiosInstance;