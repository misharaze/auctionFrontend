import { useUpgradeStore } from "../../../../Store/upgrades.store.js";
import "./RiskLine.scss";


const RiskLine = () => {
  const { chance, fromItem } = useUpgradeStore();

  if (!fromItem) return null; // ⬅️ ВАЖНО

  return (
    <div className="riskline-wrapper">
      <div className="riskline-bar">
        <div
          className="riskline-success"
          style={{ width: `${chance}%` }}
        />
      </div>

      <div className="riskline-labels">
        <span>{chance}% успех</span>
        <span>{100 - chance}% провал</span>
      </div>
    </div>
  );
};

export default RiskLine;
