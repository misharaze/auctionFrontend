import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHomeData } from "../../Api/Home.api.js";
import TrustBlock from "../../Modules/auction/components/TrustBlock/TrustBlock.jsx";
import "./Home.scss";

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [feed, setFeed] = useState([]);
  const [stats, setStats] = useState({ activeAuctions: 0, betsToday: 0 });
  const [loading, setLoading] = useState(true);







useEffect(() => {
  getHomeData()
    .then(({ auctions, feed, stats }) => {
      console.log("HOME AUCTIONS:", auctions);
      setAuctions(auctions ?? []);
      setFeed(feed ?? []);
      setStats(stats ?? { activeAuctions: 0, betsToday: 0 });
    })
    .finally(() => setLoading(false));
}, []);





  const formatEndsIn = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Завершён";
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    return `${h}ч ${m % 60}м`;
  };

  if (loading) return <div className="home-loading">Загрузка…</div>;

  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Побеждает первый.<span>Второй платит.</span>
          </h1>

          <p className="home-hero__subtitle">
            Аукцион нового типа. Без комиссий. Без скрытых условий.
          </p>

          <div className="home-hero__cta">
            <Link to="/auctions" className="btn btn--primary">
              Смотреть аукционы
            </Link>
            <Link to="/fairness" className="btn btn--ghost">
              Как это работает
            </Link>
          </div>
        </div>

        <div className="home-hero__panel">
          <div className="stat">
            <span>Активные лоты</span>
            <strong>{stats.activeAuctions}</strong>
          </div>
          <div className="stat">
            <span>Ставок сегодня</span>
            <strong>{stats.betsToday}</strong>
          </div>
          <div className="stat stat--danger">
            <span>Правило</span>
            <strong>2 место платит</strong>
          </div>
        </div>
      </section>

      <TrustBlock />

      {/* AUCTIONS */}
      <section className="home-section">
        <div className="home-section__head">
          <h2>Активные аукционы</h2>
          <Link to="/auctions">Все →</Link>
        </div>

       <div className="auction-strip">



 {auctions.map((a) => {
const title = a.item?.title ?? "Без названия";
const image = a.item?.image || "/items/";


  return (
    <Link key={a.id} to={`/auctions/${a.id}`} className="auction-card">
      <div className="auction-card__image">
 <img
  src={image}
  alt={title}
/>
        <span className="auction-card__timer">
          {formatEndsIn(a.ends_at)}
        </span>
      </div>

      <div className="auction-card__body">
        <h3>{title}</h3>

        <div className="prices">
          <div>
            <span>Лидер</span>
            <strong>{a.leader_price} ₽</strong>
          </div>
          <div className="danger">
            <span>2 место</span>
            <strong>{a.second_price} ₽</strong>
          </div>
        </div>
      </div>
    </Link>
  );
})}

</div>

      </section>

      {/* FEED */}
      <section className="home-section">
        <h2>Последние события</h2>
        <div className="feed">
          {feed.map((f) => (
            <div key={f.id} className="feed__item">
              <span className="feed__dot" />
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
