import "./AuctionStage.scss";

const AuctionStage = ({ title, startPrice, minStep, timeLeft }) => {
  return (
    <div className="auction-stage">
      <div className="auction-stage__top">
        <div className="auction-stage__title">
          <div className="pill">ЛОТ</div>
          <h2>{title}</h2>
        </div>

        {/* 🔥 ТАЙМЕР */}
        <div
          className={[
            "timer",
            timeLeft <= 10 && "timer--danger",
            timeLeft <= 0 && "timer--ended",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {timeLeft > 0 ? `${timeLeft} сек` : "Завершён"}
        </div>
      </div>

      <div className="auction-stage__preview" aria-hidden="true" />

      <div className="auction-stage__facts">
        <div className="fact">
          <span className="k">Старт</span>
          <span className="v">{startPrice} ₽</span>
        </div>

        <div className="fact">
          <span className="k">Шаг</span>
          <span className="v">≥ {minStep} ₽</span>
        </div>

        <div className="fact danger">
          <span className="k">Правило</span>
          <span className="v">2 место платит</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionStage;
