import { useNotificationsStore } from "../../Store/notification.store";
import "./notifications.scss";
import { useEffect } from "react";
const filters = [
  { key: "all", label: "Все" },
  { key: "unread", label: "Новые" },
  { key: "auction:win", label: "Победы" },
  { key: "auction:second", label: "2 место" },
  { key: "bid:outbid", label: "Перебили" },
  { key: "wallet:deposit", label: "Баланс" },
  { key: "system", label: "Система" },
];




const Notifications = () => {
  const {
    filter,
    setFilter,
    getFiltered,
    markAllRead,
    fetch
  } = useNotificationsStore();

  const list = getFiltered();



  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="notifications-page">
      <div className="notifications-head">
        <h1>Уведомления</h1>
        <button onClick={markAllRead}>Отметить все прочитанными</button>
      </div>

      {/* FILTERS */}
      <div className="notifications-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter ${filter === f.key ? "is-active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="notifications-list">
        {list.length === 0 ? (
          <div className="empty">Нет уведомлений</div>
        ) : (
          list.map((n) => (
            <div
              key={n.id}
              className={`notification ${!n.read ? "is-new" : ""}`}
            >
              <div className="notification__message">
                {n.message}
              </div>
              <div className="notification__time">
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
