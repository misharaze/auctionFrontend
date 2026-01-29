import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Auction.scss";

import { socket } from "../../Socket/socket.js";
import { getAccessToken, refreshAccessToken, logout } from "../../auth/tokenService.js";

import { getStandings } from "../../Modules/auction/auction.logic.js";

import AuctionStage from "../../Modules/auction/components/AuctionStage/AuctionStage.jsx";
import Leaders from "../../Modules/auction/components/LiveLeader/LiveLeaderBoard.jsx";
import BidPanel from "../../Modules/auction/components/BidePanel/BidePanel.jsx";
import BidConfirmModal from "../../Modules/auction/components/BideConfirmModal/BideConfirmModal.jsx";
import BidHistory from "../../Modules/auction/components/BidHistory/BideHistory.jsx";

import { getAuctionById, placeBid } from "../../Api/auctions.api.js";

const Auction = () => {
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(null);
  const [error, setError] = useState(null);

  const refreshingRef = useRef(false);

  const reloadAuction = async () => {
    const res = await getAuctionById(id);
    setAuction(res.data ?? res);
  };

  /* ========= load auction ========= */
  useEffect(() => {
    let alive = true;
    setLoading(true);

    getAuctionById(id)
      .then((res) => alive && setAuction(res.data ?? res))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [id]);

  /* ========= socket ========= */
  useEffect(() => {
    if (!id) return;
    const token = getAccessToken();
    if (!token) return;

    socket.auth = { token };
    socket.connect();
    socket.emit("join-auction", id);

    const reload = () => reloadAuction().catch(() => {});

    socket.on("auction:bid", reload);
    socket.on("auction:end", reload);

    return () => {
      socket.off("auction:bid", reload);
      socket.off("auction:end", reload);
      socket.disconnect();
    };
  }, [id]);

  /* ========= token refresh ========= */
  useEffect(() => {
    const handleConnectError = async (err) => {
      if (err.message !== "Invalid token") return;
      if (refreshingRef.current) return;

      refreshingRef.current = true;
      try {
        const newToken = await refreshAccessToken();
        socket.auth = { token: newToken };
        socket.connect();
      } catch {
        logout();
      } finally {
        refreshingRef.current = false;
      }
    };

    socket.on("connect_error", handleConnectError);
    return () => socket.off("connect_error", handleConnectError);
  }, []);

  /* ========= standings ========= */
  const { leader, second, payer, top6 } = useMemo(
    () => getStandings(auction),
    [auction]
  );

  /* ========= auction state (ТОЛЬКО ПО timeLeft) ========= */
  const timeLeft = Number.isFinite(auction?.timeLeft)
    ? auction.timeLeft
    : 0;

  const auctionState =
    timeLeft <= 0 ? "ended" : timeLeft <= 10 ? "ending" : "active";

  /* ========= bid ========= */
const handleTryBid = (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return;

  setPendingAmount(value);
  setConfirmOpen(true); // 🔥 ВОТ КЛЮЧ
};


  const handleConfirmBid = async () => {
    try {
      setError(null);
     await placeBid({
  auctionId: id,
  amount: Number(pendingAmount),
});
      await reloadAuction();
      setConfirmOpen(false);
      setPendingAmount(null);
    } catch (e) {
      setError(e.message);
      setConfirmOpen(false);
    }
  };

  if (loading) return <div className="auction-loading">Загрузка…</div>;
  if (!auction) return null;

  return (
    <div className="auction-page">
      {error && <div className="auction-error-toast">{error}</div>}

      <div className="auction-grid">
        <section className="auction-block auction-block--stage">
          <AuctionStage {...auction} />
        </section>

        <section className="auction-block auction-block--leaders">
          <Leaders leader={leader} second={second} payer={payer} />
        </section>

        <section className="auction-block auction-block--bid">
          <BidPanel
            leaderAmount={
              Number.isFinite(leader?.amount)
                ? leader.amount
                : Number(auction.startPrice)
            }
            minStep={Number(auction.minStep ?? 10)}
            onTryBid={handleTryBid}
            disabled={auctionState !== "active"}
          />
        </section>

        <section className="auction-block auction-block--history">
          <BidHistory bids={top6} leaderId={leader?.id} payerId={payer?.id} />
        </section>
      </div>

      {confirmOpen && (
        <BidConfirmModal
          amount={pendingAmount}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmBid}
        />
      )}
    </div>
  );
};

export default Auction;
