import { useEffect, useState } from "react";
import "./Profil.scss";

import { useAuthStore } from "../../Store/auth.store";
import { getStats } from "../../Api/user.api";
import { useNavigate } from "react-router-dom";
import ProfileStats from "../../Components/ProfileStats/ProfileStats.jsx";
import UserAnalytics from "../../Components/UserAnalytics/UserAnalytics.jsx";

const Profile = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (e) {
        console.error(e);
        setStats(false);
      }
    };
    load();
  }, []);

  if (stats === null) {
    return <div className="profile-loading">Загрузка профиля…</div>;
  }

  if (stats === false) {
    return <div className="profile-error">Не удалось загрузить профиль</div>;
  }

  const riskRate = Number(stats.riskRate ?? 0);
  const riskLevel =
    riskRate >= 30 ? "high" :
    riskRate >= 15 ? "medium" :
    "low";


  return (
    <div className="profile-page">
    
      <section className="profile-card">
        <div className="profile-card__left">
          <div className="avatar">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="user-info">
            <h2>{user?.username}</h2>

            <div className="badges">
              <span className="badge">LVL 7</span>
              <span className="badge badge--role">user</span>
              <span className={`badge badge--risk ${riskLevel}`}>
                {riskLevel === "high"
                  ? "High risk"
                  : riskLevel === "medium"
                  ? "Medium risk"
                  : "Low risk"}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-card__right">
          <div className="balance">
            <span>Баланс</span>
            <strong>{user?.balance ?? 0} ₽</strong>
          </div>

             <div className="actions">
        <button
    className="btn btn--ghost"
    onClick={() => navigate("/profile/settings")}
      >
    Настройки
    </button>

     <button
    className="btn btn--primary"
    onClick={() => navigate("/wallet/deposit")}
  >
    Пополнить
  </button>
</div>
        </div>
      </section>

      
      <ProfileStats stats={stats} />

  
      <UserAnalytics data={stats} />


      <section className={`risk-insight ${riskLevel}`}>
        {riskLevel === "high" ? (
          <>
            ⚠️ Ты часто занимаешь <b>2 место</b>.  
            Попробуй делать ставки ближе к завершению аукциона.
          </>
        ) : riskLevel === "medium" ? (
          <>
            ⚠️ Умеренный риск. Попробуй оптимизировать тайминг ставок.
          </>
        ) : (
          <>
            ✅ Низкий риск. Стратегия выглядит уверенной.
          </>
        )}
      </section>
    </div>
  );
};

export default Profile;

