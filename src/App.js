import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import AppRouter from "./router";
import "./styles/_global.scss";

import { useAuthStore } from "./Store/auth.store";
import { getMe } from "./Api/user.api";
import { initNotifications } from "./Socket/notifications";

const App = () => {
  const hydrate = useAuthStore(state => state.hydrate);
  const logout = useAuthStore(state => state.logout);
  const isAuth = useAuthStore(state => state.isAuth);

  // 🔁 Восстановление пользователя по токену
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    getMe()
      .then(user => {
        hydrate(user);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        logout();
      });
  }, [hydrate, logout]);

  // 🔔 Подключаем уведомления ТОЛЬКО если пользователь авторизован
  useEffect(() => {
    if (!isAuth) return;
    initNotifications();
  }, [isAuth]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
