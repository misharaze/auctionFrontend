import { http } from "./http";


export const getHomeData = async () => {
  const { data } = await http.get("/api/home");
  return data;
};