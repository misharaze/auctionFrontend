import "./ProfileStats.scss";

const Bar = ({ label, value, colorClass }) => {
  return (
    <div className="bar">
      <div className="bar__top">
        <span>{label}</span>
        <b>{value}%</b>
      </div>
      <div className="bar__track">
        <div
          className={`bar__fill ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const ProfileStats = ({ stats }) => {
  return (
    <section className="pstats">
      <div className="pstats__grid">
        <div className="pstats__card">
          <span>Всего ставок</span>
          <b>{stats.total}</b>
        </div>

        <div className="pstats__card good">
          <span>Побед</span>
          <b>{stats.wins}</b>
        </div>

        <div className="pstats__card bad">
          <span>2 место (оплачено)</span>
          <b>{stats.second}</b>
        </div>

        <div className="pstats__card">
          <span>Win rate</span>
          <b>{stats.winRate}%</b>
        </div>
      </div>

      <div className="pstats__bars">
        <Bar label="Win rate" value={stats.winRate} colorClass="fill--good" />
        <Bar label="Риск (2 место)" value={stats.riskRate} colorClass="fill--bad" />
      </div>

      <div className={`pstats__hint ${stats.riskRate >= 25 ? "hint--bad" : "hint--ok"}`}>
        {stats.riskRate >= 25 ? (
          <>⚠️ Вы часто занимаете <b>2 место</b>. Попробуйте ставить ближе к концу.</>
        ) : (
          <>✅ Ваш риск умеренный. Хороший баланс стратегии.</>
        )}
      </div>
    </section>
  );
};

export default ProfileStats;
