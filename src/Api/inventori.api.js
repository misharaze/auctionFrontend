import { http } from "./http.js";

export const getMyInventory = async () => {
  const { data } = await http.get("/api/inventory");
  return data;
};
