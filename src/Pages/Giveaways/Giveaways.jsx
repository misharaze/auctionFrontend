import { useEffect, useState } from "react";
import { getGiveaways, joinGiveaway } from "../../Api/giveaways.api.js";
import "./Giveaways.scss";

const Giveaways = () => {
  const [giveaways, setGiveaways] = useState([]);
  const [now, setNow] = useState(Date.now());
const [joiningId, setJoiningId] = useState(null);


useEffect(() => {
  const interval = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, []);




  useEffect(() => {
    getGiveaways().then(setGiveaways);
  }, []);




  
const formatEndsIn = (date) => {
  const diff = new Date(date) - new Date();
  if (diff <= 0) return "Завершён";

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  return `${hours}ч ${minutes}м`;
};

const handleJoin = async (id) => {
  try {
    setJoiningId(id);
    await joinGiveaway(id);
    const updated = await getGiveaways();
    setGiveaways(updated);
  } catch (e) {
    alert("Вы уже участвуете");
  } finally {
    setJoiningId(null);
  }
};



  return (
    <div className="giveaways-page">
      <header className="giveaways-head">
        <h1>Розыгрыши</h1>
        <p>Участие бесплатно. Победитель определяется честно.</p>
      </header>

      <div className="giveaways-list">
        {giveaways.map((g) => (
          <div key={g.id} className="giveaway-card">
            <div
              className="giveaway-card__preview"
              style={{ backgroundImage: `url(${g.image})` }}
            />

            <div className="giveaway-card__info">
              <div className="giveaway-card__title">{g.name}</div>

              <div className="giveaway-meta">
                <span>
                  Завершение:{" "}
                  {new Date(g.ends_at).toLocaleString("ru-RU")}
                </span>
                <span>Участников: {g.participants}</span>
              </div>

{g.isJoined ? (
  <button className="btn success" disabled>
    ✔ Вы участвуете
  </button>
) : (
  <button className="btn primary" onClick={() => handleJoin(g.id)}>
    Участвовать
  </button>
)}




              <span>Завершение: {formatEndsIn(g.ends_at)}</span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Giveaways;
