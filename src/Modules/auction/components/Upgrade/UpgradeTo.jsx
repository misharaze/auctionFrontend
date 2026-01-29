import { useEffect, useState } from "react";
import { useUpgradeStore } from "../../../../Store/upgrades.store.js";
import { getItems } from "../../../../Api/items.api.js";
import "./upgrade-block.scss";

const UpgradeTo = () => {
  const [items, setItems] = useState([]);
  const { setToItem, toItem } = useUpgradeStore();

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  return (
    <div className="upgrade-block">
       <h3 className="upgrade-block__title">Цель</h3>

      <div className="upgrade-targets">
        {items.map((item) => (
          <div
            key={item.id}
            className={`item-card ${toItem?.id === item.id ? "active" : ""}`}
            onClick={() => setToItem(item)}
          >
            <div className="name">{item.name}</div>
            <div className="price">{item.price} ₽</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradeTo;
