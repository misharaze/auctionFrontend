import { Link } from "react-router-dom";
import "./AuctionCard.scss";

const AuctionCard = ({ auction }) => {
  const isHot = auction.timeLeft <= 10;

  return (
    <Link
      to={`/auctions/${auction.id}`}
      className={`auction-card ${isHot ? "hot" : ""}`}
    >
      <div
        className="auction-card__image"
        style={{ backgroundImage: `url(${auction.image})` }}
      />

      <div className="auction-card__overlay">
        <span className="rule">2 место платит</span>
        {isHot && <span className="hot-badge">🔥 HOT</span>}
      </div>

      <div className="auction-card__body">
        <div className="auction-card__title">{auction.title}</div>

        <div className="auction-card__prices">
          <div>
            <span>Лидер</span>
            <strong>{auction.leader_price} ₽</strong>
          </div>
          <div className="danger">
            <span>2 место</span>
            <strong>{auction.second_price} ₽</strong>
          </div>
        </div>

        <div className="auction-card__footer">
          Осталось: {auction.endsIn}
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
