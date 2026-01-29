import "./BalanceCard.scss";

const BalanceCard = ({ balance = 0 }) => {
  return (
    <div className="balance-card">
      <span>Баланс</span>
      <strong>{balance} ₽</strong>
    </div>
  );
};

export default BalanceCard;
