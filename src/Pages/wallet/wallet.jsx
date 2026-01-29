import { useEffect, useState } from "react";
import "./wallet.scss";
import { getBalance, getOperations } from "../../Api/user.api";

import BalanceCard from "../../Components/BalanceCard/BalanceCard.jsx";
import OperationsList from "../../Components/OperationList/OperationList.jsx";
import DepositsHistory from "../../Components/DepositHistory/DepositHistory.jsx";
import { useAuthStore } from "../../Store/auth.store.js";


const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
const { setUserBalance } = useAuthStore();

  useEffect(() => {
    Promise.all([getBalance(), getOperations()])
      .then(([b, ops]) => {
        setBalance(b.balance);
         setUserBalance(b.balance);
        setOperations(ops);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="wallet-loading">Загрузка...</div>;

 return (
  <div className="wallet-page">
    <h1 className="wallet-title">Кошелёк</h1>

    <section className="wallet-section wallet-section--balance">
      <BalanceCard balance={balance} />
    </section>

    <section className="wallet-section">
      <DepositsHistory />
    </section>

    <section className="wallet-section">
      <OperationsList operations={operations} />
    </section>
  </div>
);
}

export default Wallet;
