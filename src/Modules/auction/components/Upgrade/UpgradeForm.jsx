import { useState } from "react";
import "./upgrade.scss";
import UpgradeFrom from "./UpgradeFrom.jsx";
import UpgradeTo from "./UpgradeTo.jsx";
import RiskLine from "./RiskLine.jsx";
import UpgradeResult from "./UpgradeResult.jsx";
import { useInventoryStore } from "../../../../Store/inventory.store.js";

const UpgradeForm = () => {
  const [chance, setChance] = useState(42);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // success | fail
const {selected, target} = useInventoryStore();
const { fromItem, toItem, setChances } = useUpgradeStore();

  const handleUpgrade = () => {
    if (busy) return;

    setBusy(true);
    setResult(null);

    // ⚠️ пока локальный roll (ПОЗЖЕ УБЕРЁМ)
    setTimeout(() => {
      const roll = Math.random() * 100;
      setResult(roll <= chance ? "success" : "fail");
      setBusy(false);
    }, 800);
  };
useEffect(() => {
  if (!fromItem || !toItem) return;

  const chance = Math.min(
    95,
    Math.floor((fromItem.price / toItem.price) * 100)
  );

  setChances(chance);
}, [fromItem, toItem]);

  return (
    <div className="upgrade-page">
      <div className="upgrade-card">
        <h1 className="upgrade-title">Апгрейд</h1>
        <p className="upgrade-subtitle">
          Выбор, а не случай. Шанс известен заранее.
        </p>

        <div className="upgrade-section">
          <UpgradeFrom />
          <RiskLine chance={chance} />
          <UpgradeTo />
        </div>

        <button
          className={`upgrade-btn ${busy ? "is-loading" : ""}`}
          onClick={handleUpgrade}
          disabled={busy}
        >
          {busy ? "Выполняется..." : "Попробовать апгрейд"}
          <span>Риск осознанный</span>
        </button>

        {result && <UpgradeResult result={result} />}
      </div>
    </div>
  );
};

export default UpgradeForm;
