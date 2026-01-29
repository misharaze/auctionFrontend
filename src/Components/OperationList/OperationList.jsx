import OperationItem from "../OperationItem/OperationItem.jsx";
import "./OperationList.scss";

const OperationsList = ({ operations = [] }) => {
  return (
    <div className="operations">
      <div className="operations__title">История операций</div>

      {operations.length === 0 ? (
        <div className="operations__empty">
          Операций пока нет
        </div>
      ) : (
        <div className="operations__list">
          {operations.map((op) => (
            <OperationItem key={op.id} op={op} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationsList;
