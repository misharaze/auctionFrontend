import { useEffect, useState } from "react";
import { getMyBids } from "../../Api/bids.api";
import "./MyBids.scss";
import { useNavigate } from "react-router-dom";

const filters = [
  { key: null, label: "Все" },
  { key: "win", label: "Победы" },
  { key: "second", label: "2 место" },
  { key: "lost", label: "Проигрыши" },
];

const labels = {
  win: "Победа",
  second: "2 место (оплачено)",
  lost: "Проигрыш",
};

const MyBids = () => {
     const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyBids({ page, type })
      .then(setBids)
      .finally(() => setLoading(false));
  }, [page, type]);

  return (
    <div className="my-bids-page">
      <h1>История ставок</h1>

      {/* FILTERS */}
      <div className="bids-filters">
        {filters.map(f => (
          <button
            key={f.label}
            className={`filter ${type === f.key ? "is-active" : ""}`}
            onClick={() => {
              setType(f.key);
              setPage(1);
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="bids-table">


          
          {bids.map(bid => (
           <div
  key={bid.id}
  className={`bids-row bids-row--${bid.result}`}
  onClick={() => navigate(`/auctions/${bid.auction_id}`)}
>
              <span>{bid.item}</span>
              <span>{bid.amount} ₽</span>
              <span>{bid.position}</span>
              <span>{labels[bid.result]}</span>
              <span>{new Date(bid.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>←</button>
        <span>{page}</span>
        <button onClick={() => setPage(p => p + 1)}>→</button>
      </div>
    </div>
  );
};

export default MyBids;
