import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: 'https://bd-cinema-house-server.vercel.app',
  baseURL: "http://localhost:3000/api/v1", // Set your desired base URL
});

export default axiosInstance;
