import { http } from "./http";

export const getGiveaways = async () => {
  const { data } = await http.get("/api/giveaways");
  return data;
};

export const joinGiveaway = async (id) => {
  const { data } = await http.post(`/api/giveaways/${id}/join`);
  return data;
};
