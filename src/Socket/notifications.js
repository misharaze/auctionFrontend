import { socket } from "./socket.js";
import { useNotificationsStore } from "../Store/notification.store";

export const initNotifications = () => {
  const { add } = useNotificationsStore.getState();

  socket.on("notification:new", (payload) => {
    add(payload);
  });
};
