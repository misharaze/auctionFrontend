// src/Store/upgrades.store.js
import { create } from "zustand";

export const useUpgradeStore = create((set) => ({
  fromItem: null,
  toItem: null,
  chance: 0,
  busy: false,
  result: null,

  setFromItem: (item) => set({ fromItem: item, result: null }),
  setToItem: (item) => set({ toItem: item, result: null }),
  setChance: (chance) => set({ chance }),
  setBusy: (busy) => set({ busy }),
  setResult: (result) => set({ result }),

  reset: () =>
    set({
      fromItem: null,
      toItem: null,
      chance: 0,
      result: null,
      busy: false,
    }),
}));
