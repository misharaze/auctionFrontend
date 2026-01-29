import { useUpgradeStore } from "../../../../Store/upgrades.store.js";
import "./upgrade-block.scss"


const UpgradeFrom = () => {
  const { fromItem } = useUpgradeStore();

  if (!fromItem) {
    return (
      <div className="upgrade-block empty">
        Выберите предмет из инвентаря
      </div>
    );
  }

  return (
    <div className="upgrade-block">
      <h3>Ваш предмет</h3>
      <div className="item-card">
        <div className="name">{fromItem.name}</div>
        <div className="price">{fromItem.price} ₽</div>
      </div>
    </div>
  );
};

export default UpgradeFrom;
