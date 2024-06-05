<<<<<<< HEAD
import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: 'https://bd-cinema-house-server.vercel.app',
  baseURL: "http://localhost:3000/api/v1", // Set your desired base URL
});

export default axiosInstance;
=======
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://bd-cinema-house-server.vercel.app/', 
  baseURL: 'http://localhost:3000', // Set your desired base URL
});

export default axiosInstance;
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0
