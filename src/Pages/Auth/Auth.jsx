import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import { login, register } from "../../Api/auth.api";
import { useAuthStore } from "../../Store/auth.store.js";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data =
        mode === "login"
          ? await login({ email, password })
          : await register({ email, username, password });

      // 🔐 сохраняем токен
  localStorage.setItem("accessToken", data.accessToken);
localStorage.setItem("refreshToken", data.refreshToken);

authStore.login(data.user);
      // 👉 редирект
      navigate("/");
    } catch (e) {
  if (e.details?.length) {
    setError(e.details[0].message);
  } else {
    setError(e.message || "Ошибка");
  }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "is-active" : ""}
            onClick={() => setMode("login")}
          >
            Вход
          </button>
          <button
            className={mode === "register" ? "is-active" : ""}
            onClick={() => setMode("register")}
          >
            Регистрация
          </button>
        </div>

        <h1 className="auth-title">
          {mode === "login" ? "С возвращением" : "Создать аккаунт"}
        </h1>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Войдите, чтобы участвовать в аукционах"
            : "Регистрация займёт меньше минуты"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" disabled={loading}>
            {loading
              ? "Подождите..."
              : mode === "login"
              ? "Войти"
              : "Зарегистрироваться"}
          </button>
        </form>

        <div className="auth-divider">
          <span>или</span>
        </div>

        <button className="steam-btn">Войти через Steam</button>

        <div className="auth-note">
          Побеждает первый, второй оплачивает риск
        </div>
      </div>
    </div>
  );
};

export default Auth;
