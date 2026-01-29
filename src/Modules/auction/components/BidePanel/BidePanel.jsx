import { useMemo, useState } from "react";
import "./BidePanel.scss";

const BidPanel = ({ leaderAmount, minStep, onTryBid, disabled }) => {
  const [custom, setCustom] = useState("");
  const [submitting, setSubmitting] = useState(false);
const isDisabled = disabled || submitting;

  const minNext = useMemo(() => {
    return Number(leaderAmount) + Number(minStep);
  }, [leaderAmount, minStep]);

  // 🔹 универсальный обработчик ставки
  const handleBid = async (amount) => {
    if (submitting) return;
    if (!amount || amount < minNext) return;

    try {
      setSubmitting(true);
      await onTryBid(amount);
      setCustom("");
    } finally {
      setSubmitting(false);
    }
  };

  const quick = [
    minNext,
    minNext + minStep * 2,
    minNext + minStep * 5,
  ];

  return (
    <div className="bid-panel">
      <h3 className="bid-panel__title">Ставка</h3>

      <div className="bid-panel__min">
        Следующая минимальная: <b>{minNext} ₽</b>
      </div>

      {/* Быстрые ставки */}
      <div className="quick">
        {quick.map((v) => (
          <button
            key={v}
            className="quick__btn"
            onClick={() => handleBid(v)}
            disabled={submitting}
          
          >
            {v} ₽
          </button>
        ))}
      </div>

      {/* Кастомная ставка */}
      <div className="custom">
        <input
          value={custom}
          onChange={(e) =>
            setCustom(e.target.value.replace(/[^\d]/g, ""))
          }
          placeholder={`Введите ≥ ${minNext}`}
          disabled={isDisabled}
        />

        <button
          className="custom__btn"
          onClick={() => handleBid(Number(custom))}
          disabled={isDisabled|| Number(custom) < minNext}
        >
          {submitting ? "Отправка..." : "Подтвердить"}
        </button>
      </div>

      {/* Предупреждение */}
      <div className="risk-box">
        <div className="risk-box__t">Важно</div>
        <div className="risk-box__d">
          Если вы займёте <b>2 место</b> в момент окончания таймера —
          ставка будет списана.
        </div>
      </div>
    </div>
  );
};

export default BidPanel;
