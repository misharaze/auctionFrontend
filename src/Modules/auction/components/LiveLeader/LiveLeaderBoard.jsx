import "./leaderboard.scss";

const Leaders = ({ leader, second, payer }) => {
  return (
    <div className="leaders">
      <div className="leaders__title">
        Позиции
        <span className="leaders__rule">1-й забирает · 2-й платит</span>
      </div>

      <div className="leaders__grid">
        <div className="slot slot--win">
          <div className="slot__top">
            <span className="badge badge--win">1 место</span>
            <span className="slot__label">Победитель</span>
          </div>
          <div className="slot__main">
            <b>{leader?.user || leader?.username || "—"}</b>
            <span>{leader?.amount ? `${leader.amount} ₽` : "—"}</span>
          </div>
          <div className="slot__hint">Забирает лот и платит свою ставку</div>
        </div>

        <div className="slot slot--pay">
          <div className="slot__top">
            <span className="badge badge--pay">2 место</span>
            <span className="slot__label">Плательщик</span>
          </div>
          <div className="slot__main">
            <b>{payer?.user || payer?.username || "—"}</b>
            <span>{payer?.amount ? `${payer.amount} ₽` : "—"}</span>
          </div>
          <div className="slot__hint">Платит ставку, но не получает лот</div>
        </div>
      </div>

      {second && (
        <div className="leaders__note">
          ⚠ Риск: если аукцион закончится сейчас — оплатит <b>2 место</b>.
        </div>
      )}
    </div>
  );
};

export default Leaders;
