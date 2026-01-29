import { useEffect, useState } from "react";
import { getDeposits } from "../../Api/wallet.api.js";
import "./DepositHistory.scss";

const DepositsHistory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDeposits()
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка истории…</div>;
  if (!list.length) return <div>Пополнений пока нет</div>;

  return (
    <div className="deposits-history">
      <h3>История пополнений</h3>

      {list.map(d => (
        <div key={d.id} className="deposit-row">
          <span>{new Date(d.created_at).toLocaleString()}</span>
          <span>{d.amount} ₽</span>
          <span>{d.meta?.method}</span>
        </div>
      ))}
    </div>
  );
};

export default DepositsHistory;
