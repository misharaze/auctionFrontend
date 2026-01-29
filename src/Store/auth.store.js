import { create } from "zustand";

export const useAuthStore = create(set => ({
  user: null,
  isAuth: false,

  login(user) {
    set({ user, isAuth: true });
  },

  logout() {
    set({ user: null, isAuth: false });
  },
  
setUserBalance: (balance) =>
  set((state) => ({
    user: { ...state.user, balance },
  })),



  // 🔥 ВОССТАНОВЛЕНИЕ СЕССИИ
  hydrate(user) {
    set({ user, isAuth: true });
  }
}));
