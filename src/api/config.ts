import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
export const axiosConfigBuddie = wrapper(
  axios.create({
    baseURL: "https://eagle-test.buddi.co.uk",
    withCredentials: true,
    jar,
  })
);

export const axiosConfig = axios.create({
  baseURL: "https://we-sense-git-carriers-yosipmikecolins-projects.vercel.app/api",
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
