import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const jar = new CookieJar();
export const axiosConfigBuddie = wrapper(
  axios.create({
    baseURL: "https://eagle-test.buddi.co.uk",
    withCredentials: true,
    jar,
  })
);

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
