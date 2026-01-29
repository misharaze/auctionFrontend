import { useState } from "react";
import "./ProfileSettings.scss";
import { useAuthStore } from "../../Store/auth.store";

const ProfileSettings = () => {
  const { user } = useAuthStore();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [notifyBids, setNotifyBids] = useState(true);
  const [notifyWins, setNotifyWins] = useState(true);

  const [status, setStatus] = useState(null); // success | error | null

  const saveProfile = (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="settings-page">
      <h1>Настройки аккаунта</h1>

      {status === "success" && (
        <div className="alert success">Изменения сохранены</div>
      )}
      {status === "error" && (
        <div className="alert error">Проверь введённые данные</div>
      )}

      {/* ПРОФИЛЬ */}
      <section className="settings-card">
        <h2>Профиль</h2>

        <form onSubmit={saveProfile}>
          <label>
            Никнейм
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <button className="btn primary">Сохранить</button>
        </form>
      </section>

      {/* БЕЗОПАСНОСТЬ */}
      <section className="settings-card">
        <h2>Безопасность</h2>

        <form onSubmit={changePassword}>
          <label>
            Старый пароль
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </label>

          <label>
            Новый пароль
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>

          <button className="btn primary">Сменить пароль</button>
        </form>
      </section>

      {/* УВЕДОМЛЕНИЯ */}
      <section className="settings-card">
        <h2>Уведомления</h2>

        <div className="toggle">
          <input type="checkbox" checked={notifyBids} onChange={() => setNotifyBids(!notifyBids)} />
          <span>Перебитые ставки</span>
        </div>

        <div className="toggle">
          <input type="checkbox" checked={notifyWins} onChange={() => setNotifyWins(!notifyWins)} />
          <span>Победы в аукционах</span>
        </div>
      </section>

      {/* ОПАСНО */}
      <section className="settings-card danger">
        <h2>Опасная зона</h2>
        <button className="btn danger">Удалить аккаунт</button>
      </section>
    </div>
  );
};

export default ProfileSettings;
