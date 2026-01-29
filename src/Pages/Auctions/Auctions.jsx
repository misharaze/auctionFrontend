import { useEffect, useState } from "react";
import { getAuctions } from "../../Api/auctions.api";
import AuctionCard from "../../Modules/auction/components/AuctionCard/AuctionCard";
import "./Auctions.scss";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuctions()
      .then((data) => setAuctions(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading">Загрузка...</div>;

  return (
    <div className="auctions-page">
      {/* HEADER */}
      <div className="auctions-head">
        <h1>Аукционы</h1>
        <p>Активные лоты. Побеждает первый — второй платит.</p>
      </div>

      {/* GRID */}
      <div className="auctions-grid">
        {auctions.map((a) => (
          <AuctionCard key={a.id} auction={a} />
        ))}
      </div>

      {/* PAGINATION (пока статическая) */}
      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </div>
  );
};

export default Auctions;
