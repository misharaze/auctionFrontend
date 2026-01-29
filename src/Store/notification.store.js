import { create } from "zustand";
import { getNotifications, markAllRead as apiMarkAllRead } from "../Api/notifications.api.js";

export const useNotificationsStore = create((set, get) => ({
  items: [],
  unread: 0,
  filter: "all",

  async fetch() {
    const list = await getNotifications();
    set({
      items: list,
      unread: list.filter(n => !n.read).length,
    });
  },

  add(notification) {
    set((state) => ({
      items: [notification, ...state.items],
      unread: state.unread + (notification.read ? 0 : 1),
    }));
  },

  async markAllRead() {
    await apiMarkAllRead();
    set((state) => ({
      items: state.items.map((n) => ({ ...n, read: true })),
      unread: 0,
    }));
  },

  setFilter(filter) {
    set({ filter });
  },

  getFiltered() {
    const { items, filter } = get();
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.type === filter);
  },
}));
