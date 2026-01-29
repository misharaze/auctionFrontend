import "./OperationRow.scss";

const OperationRow = ({ op }) => {
  const isPlus = op.amount > 0;

  return (
    <div className={`operation ${isPlus ? "plus" : "minus"}`}>
      <div className="operation__info">
        <div className="operation__title">{op.title}</div>
        <div className="operation__date">{op.createdAt}</div>
      </div>

      <div className="operation__amount">
        {isPlus ? "+" : ""}
        {op.amount} ₽
      </div>
    </div>
  );
};

export default OperationRow;
