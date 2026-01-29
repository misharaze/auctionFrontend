import { useEffect, useRef } from "react";
import "./BideHistory.scss";

const BidHistory = ({ bids, leaderId, payerId }) => {
  const prevTopRef = useRef(null);

  useEffect(() => {
    if (!bids?.length) return;

    const currentTop = bids[0]?.id;
    if (prevTopRef.current && prevTopRef.current !== currentTop) {
      const el = document.querySelector(
        `[data-bid-id="${currentTop}"]`
      );
      el?.classList.add("bid--flash");

      setTimeout(() => {
        el?.classList.remove("bid--flash");
      }, 800);
    }

    prevTopRef.current = currentTop;
  }, [bids]);

  return (
    <div className="bid-history">
      {bids.map((b) => (
        <div
          key={b.id}
          data-bid-id={b.id}
          className={[
            "bid",
            b.id === leaderId && "bid--leader",
            b.id === payerId && "bid--payer",
          ].filter(Boolean).join(" ")}
        >
          <span>{b.user}</span>
          <b>{b.amount} ₽</b>
        </div>
      ))}
    </div>
  );
};

export default BidHistory;
