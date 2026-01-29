import { create } from "zustand";
import { getMyInventory } from "../Api/inventori.api";

export const useInventoryStore = create((set) => ({
  items: [],
  loading: false,
  selected: null,

  fetch: async () => {
    set({ loading: true });
    const items = await getMyInventory();
    set({ items, loading: false });
  },

  select: (item) => set({ selected: item }),
}));
