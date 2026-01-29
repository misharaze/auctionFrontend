// src/Pages/Upgrade/upgrade.jsx
import { useEffect, useState } from "react";
import RiskLine from "../../Modules/auction/components/Upgrade/RiskLine.jsx";
import UpgradeFrom from "../../Modules/auction/components/Upgrade/UpgradeFrom.jsx";
import UpgradeResult from "../../Modules/auction/components/Upgrade/UpgradeResult.jsx";
import UpgradeTo from "../../Modules/auction/components/Upgrade/UpgradeTo.jsx";
import UpgradeRoll from "../../Modules/auction/components/Upgrade/upgradeRoll.jsx";
import { useUpgradeStore } from "../../Store/upgrades.store.js";
import { tryUpgrade } from "../../Api/upgrade.api.js";

const Upgrade = () => {
  const {
    fromItem,
    toItem,
    chance,
    busy,
    result,
    setBusy,
    setResult,
    setChance,
  } = useUpgradeStore();

  const [rolling, setRolling] = useState(false);

  // ✅ пересчет шанса при выборе предметов
  useEffect(() => {
    if (!fromItem || !toItem) {
      setChance(0);
      return;
    }
    const ch = Math.min(95, Math.max(1, Math.floor((Number(fromItem.price) / Number(toItem.price)) * 100)));
    setChance(ch);
  }, [fromItem, toItem, setChance]);

  const handleUpgrade = async () => {
    if (busy || !fromItem || !toItem) return;

    setBusy(true);
    setRolling(true);
    setResult(null);

    try {
      const res = await tryUpgrade({
        fromInventoryId: fromItem.id,
        toItemId: toItem.id,
      });

      setTimeout(() => {
        setRolling(false);
        setResult(res.success ? "success" : "fail");
        setBusy(false);
      }, 1200);
    } catch (e) {
      setRolling(false);
      setBusy(false);
      setResult("fail");
      console.error(e);
    }
  };

  return (
    <>
     <div className="upgrade-page">
  <UpgradeFrom />
  <RiskLine />
  <UpgradeTo />

  <button
    className="upgrade-action"
    disabled={!fromItem || !toItem || busy}
    onClick={handleUpgrade}
  >
    {busy ? "Выполняется..." : "Попробовать апгрейд"}
    <span>Риск осознанный</span>
  </button>

  <UpgradeRoll chance={chance} rolling={rolling} />
  {result && <UpgradeResult result={result} />}
</div>
    </>
  );
};

export default Upgrade;
