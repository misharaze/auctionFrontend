import "./UserAnalytics.scss";

const labels = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

const UserAnalytics = ({ data }) => {
  return (
    <section className="analytics">
      <h3>Аналитика</h3>

      <div className="analytics-grid">
        <div>
          <span>Win rate</span>
          <strong>{data.winRate}%</strong>
        </div>

        <div>
          <span>Средняя ставка</span>
          <strong>{data.avgBid} ₽</strong>
        </div>

        <div className={`risk risk--${data.riskLevel}`}>
          <span>Риск-профиль</span>
          <strong>{labels[data.riskLevel]}</strong>
        </div>
      </div>

      {data.riskLevel === "high" && (
        <div className="analytics-hint">
          ⚠️ Ты часто занимаешь 2 место.  
          Попробуй делать ставки ближе к завершению аукциона.
        </div>
      )}
    </section>
  );
};

export default UserAnalytics;
