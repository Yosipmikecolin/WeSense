import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
