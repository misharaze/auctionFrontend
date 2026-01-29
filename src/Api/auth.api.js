

import { http } from "./http";

export const login = async ({ email, password }) => {
  const { data } = await http.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const register = async ({ email, username, password }) => {
  const { data } = await http.post("/api/auth/register", {
    email,
    username,
    password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await http.post("/api/auth/logout");
  return data;
};
