// src/Pages/Inventory/Inventory.jsx
import { useEffect, useState } from "react";
import "./Inventory.scss";
import { getMyInventory } from "../../Api/inventori.api.js";
import { useUpgradeStore } from "../../Store/upgrades.store.js";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { setFromItem } = useUpgradeStore();

  useEffect(() => {
    getMyInventory().then(setItems).catch(console.error);
  }, []);

  const filtered = items.filter((item) => {
    if (filter === "available") return item.status === "available";
    if (filter === "locked") return item.status === "locked";
    return true;
  });

  const handleSelectForUpgrade = (item) => {
    if (item.status !== "available") return;
    setFromItem(item);
    navigate("/upgrades");
  };

  return (
    <div className="inventory-page">
      <div className="inventory-head">
        <h1>Инвентарь</h1>
        <p>Управляйте предметами</p>
      </div>

      <div className="inventory-filters">
        {["all", "available", "locked"].map((f) => (
          <button
            key={f}
            className={filter === f ? "is-active" : ""}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Все" : f === "available" ? "Доступные" : "Заблокированные"}
          </button>
        ))}
      </div>

      <div className="inventory-list">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`inventory-row ${item.status}`}
            role="button"
            tabIndex={0}
            onClick={() => handleSelectForUpgrade(item)}
          >
            <div className="info">
              <div className="name">{item.name}</div>
              <div className="price">{item.price} ₽</div>
            </div>

            {item.status === "available" ? (
              <span className="upgrade-hint">→ Апгрейд</span>
            ) : (
              <span className="locked-label">Недоступно</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
