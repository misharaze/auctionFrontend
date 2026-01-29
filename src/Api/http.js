import axios from "axios";
import { getAccessToken } from "../auth/tokenService";

export const http = axios.create({
  baseURL: "http://localhost:4000", 
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
