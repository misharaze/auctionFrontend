import { http } from "./http";

/**
 * Все предметы (для апгрейда / целей)
 */
export const getItems = async () => {
  const { data } = await http.get("/api/items");
  return data;
};

/**
 * Инвентарь пользователя
 */
export const getInventory = async () => {
  const { data } = await http.get("/api/items/inventory");
  return data;
};
