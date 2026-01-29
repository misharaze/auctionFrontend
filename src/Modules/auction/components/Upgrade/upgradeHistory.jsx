import "./upgrade-history.scss";

const UpgradeHistory = ({ history }) => {
  if (!history?.length) {
    return <div className="upgrade-history__empty">История пуста</div>;
  }

  return (
    <div className="upgrade-history">
      {history.map((h) => (
        <div
          key={h.id}
          className={`upgrade-history__row ${h.success ? "win" : "fail"}`}
        >
          <span>{h.success ? "Успех" : "Провал"}</span>
          <span>{new Date(h.created_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default UpgradeHistory;
