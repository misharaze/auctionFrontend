import "./OperationItem.scss";

const labels = {
  bid_win: "Победа в аукционе",
  bid_pay: "Оплата второго места",
  deposit: "Пополнение",
  withdraw: "Вывод средств",
};

const OperationItem = ({ op }) => {
  const positive = op.amount > 0;

  return (
    <div className={`op ${positive ? "op--plus" : "op--minus"}`}>
      <div className="op__info">
        <b>{labels[op.type] || op.type}</b>
        <span>
          {new Date(op.created_at).toLocaleString()}
        </span>
      </div>

      <div className="op__amount">
        {positive ? "+" : ""}
        {op.amount} ₽
      </div>
    </div>
  );
};

export default OperationItem;
