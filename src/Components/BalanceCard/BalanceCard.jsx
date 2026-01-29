import { useNavigate } from "react-router-dom";
import "./BalanceCard.scss";

const BalanceCard = ({ balance }) => {
  const navigate = useNavigate();

  return (
    <div className="balance-card">
      <div className="balance-card__label">Текущий баланс</div>
      <div className="balance-card__value">{balance} ₽</div>

      <div className="balance-card__actions">
        <button
          className="btn primary"
          onClick={() => navigate("/wallet/deposit")}
        >
          Пополнить
        </button>

        <button
          className="btn ghost"
          onClick={() => navigate("/wallet/withdraw")}
        >
          Вывести
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
