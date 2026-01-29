import { http } from "./http";

/**
 * Текущий пользователь
 */
export const getMe = async () => {
  const { data } = await http.get("/api/user");
  return data;
};

/**
 * Баланс пользователя
 */
export const getBalance = async () => {
  const { data } = await http.get("/api/user/balance");
  return data;
};

/**
 * История операций
 */
export const getOperations = async () => {
  const { data } = await http.get("/api/user/operations");
  return data;
};

export const getStats = async () => {
  const { data } = await http.get("/api/user/stats");
  return data;
};

export const getAnalytics = async () =>{
    const  {data} = await http.get("/api/user/analytics");

    return data;
}

