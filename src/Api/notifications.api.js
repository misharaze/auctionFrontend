import { http } from "./http";

export const getNotifications = async () => {
  const { data } = await http.get("/api/notifications");
  return data;
};

export const markAllRead = async () => {
  await http.post("/api/notifications/read-all");
};
