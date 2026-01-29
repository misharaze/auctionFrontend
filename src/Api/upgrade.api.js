import { http } from "./http.js";

export const tryUpgrade = async ({ fromInventoryId, toItemId }) => {
  const { data } = await http.post("/api/upgrades", {
    fromInventoryId,
    toItemId,
  });
  return data;
};
