import "./OperationList.scss";

const OperationList = ({ operations = [] }) => {
  if (operations.length === 0) {
    return <div className="operations-empty">Операций пока нет</div>;
  }

  return (
    <div className="operations">
      {operations.map((op, i) => (
        <div key={i} className="operation">
          <span>{op.type}</span>
          <strong>{op.amount} ₽</strong>
        </div>
      ))}
    </div>
  );
};

export default OperationList;
