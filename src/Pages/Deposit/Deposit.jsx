import { useState } from "react";
import "./Deposit.scss";

const methods = [
  { id: "card", title: "Банковская карта", fee: 2 },
  { id: "sbp", title: "СБП", fee: 0 },
  { id: "crypto", title: "Криптовалюта", fee: 1 },
];

const Deposit = () => {
  const [method, setMethod] = useState("sbp");
  const [amount, setAmount] = useState(500);

  const currentMethod = methods.find(m => m.id === method);
  const fee = Math.round(amount * (currentMethod.fee / 100));
  const total = amount + fee;

  return (
    <div className="deposit-page">
      <h1>Пополнение баланса</h1>

      <section className="deposit-card">
        <h2>Способ оплаты</h2>
        <div className="methods">
          {methods.map(m => (
            <button
              key={m.id}
              className={method === m.id ? "active" : ""}
              onClick={() => setMethod(m.id)}
            >
              {m.title}
              <span>{m.fee}%</span>
            </button>
          ))}
        </div>
      </section>

      <section className="deposit-card">
        <h2>Сумма</h2>

        <div className="amounts">
          {[100, 250, 500, 1000].map(v => (
            <button key={v} onClick={() => setAmount(v)} className={amount === v ? "active" : ""}>
              {v} ₽
            </button>
          ))}
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Другая сумма"
        />

        <div className="summary">
          <div>Сумма: <b>{amount} ₽</b></div>
          <div>Комиссия: <b>{fee} ₽</b></div>
          <div className="total">Итого: <b>{total} ₽</b></div>
        </div>

        <button className="btn primary full">Пополнить</button>
      </section>
    </div>
  );
};

export default Deposit;
