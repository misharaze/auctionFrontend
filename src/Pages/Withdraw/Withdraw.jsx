import { useState } from "react";
import { withdraw } from "../../Api/wallet.api.js";
import { useAuthStore } from "../../Store/auth.store.js";
import "./Withdraw.scss";

const Withdraw = () => {
  const { setBalance } = useAuthStore();

  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState("card");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await withdraw(amount, method, details);
      setBalance(res.balance);
      setSuccess(true);
    } catch {
      setError("Не удалось выполнить вывод средств");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">
      <h1>Вывод средств</h1>

      <div className="withdraw-card">
        {/* ===== СПОСОБ ===== */}
        <div className="block">
          <div className="block-title">Способ вывода</div>
          <div className="methods">
            <button
              className={method === "card" ? "active" : ""}
              onClick={() => setMethod("card")}
            >
              Банковская карта
            </button>
            <button
              className={method === "sbp" ? "active" : ""}
              onClick={() => setMethod("sbp")}
            >
              СБП
            </button>
            <button
              className={method === "crypto" ? "active" : ""}
              onClick={() => setMethod("crypto")}
            >
              Криптовалюта
            </button>
          </div>
        </div>

        {/* ===== СУММА ===== */}
        <div className="block">
          <div className="block-title">Сумма</div>

          <div className="quick-amounts">
            {[100, 250, 500, 1000].map((v) => (
              <button
                key={v}
                className={amount === v ? "active" : ""}
                onClick={() => setAmount(v)}
              >
                {v} ₽
              </button>
            ))}
          </div>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="Введите сумму"
          />
        </div>

        {/* ===== РЕКВИЗИТЫ ===== */}
        <div className="block">
          <div className="block-title">Реквизиты</div>
          <input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={
              method === "crypto"
                ? "Адрес кошелька"
                : "Номер карты / телефона"
            }
          />
        </div>

        {/* ===== ИТОГО ===== */}
        <div className="summary">
          <div>
            <span>К выводу:</span>
            <strong>{amount} ₽</strong>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">Заявка на вывод создана</div>}

        <button
          className="submit-btn"
          onClick={submit}
          disabled={loading || amount <= 0 || !details}
        >
          {loading ? "Обработка..." : "Вывести средства"}
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
