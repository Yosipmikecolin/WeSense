import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://we-sense.vercel.app/api",
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
