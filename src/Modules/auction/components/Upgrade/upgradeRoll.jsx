import "./upgrade-roll.scss";

const UpgradeRoll = ({ chance, rolling, result }) => {
  return (
    <div className="upgrade-roll">
      <div
        className={`upgrade-roll__track ${rolling ? "rolling" : ""}`}
        style={{
          transform: rolling
            ? `translateX(-${100 - chance}%)`
            : "translateX(-50%)",
        }}
      >
        <div className="zone fail">FAIL</div>
        <div className="zone success">WIN</div>
      </div>

      <div className="upgrade-roll__marker" />

      {result && (
        <div className={`upgrade-roll__result ${result}`}>
          {result === "success" ? "УСПЕХ" : "ПРОВАЛ"}
        </div>
      )}
    </div>
  );
};

export default UpgradeRoll;
