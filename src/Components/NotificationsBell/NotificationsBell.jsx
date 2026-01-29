import { useState } from "react";
import { useNotificationsStore } from "../../Store/notification.store";
import "./Notifications.scss";

const NotificationBell = () => {
  const { items, unread, markAllRead } = useNotificationsStore();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="notif"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="notif__btn">
        🔔
        {unread > 0 && <span className="notif__badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif__dropdown">
          <div className="notif__head">
            <span>Уведомления</span>
            {unread > 0 && (
              <button onClick={markAllRead}>Прочитать все</button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="notif__empty">Нет уведомлений</div>
          ) : (
            items.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className={`notif__item ${!n.read ? "is-new" : ""}`}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
