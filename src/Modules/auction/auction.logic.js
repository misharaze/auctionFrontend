export const getStandings = (auction) => {
  const bids = Array.isArray(auction?.bids) ? auction.bids : [];
  const sorted = [...bids].sort((a, b) => b.amount - a.amount);

  const leader = sorted[0] || null;
  const second = sorted[1] || null;

  // payer = второе место (по твоей модели)
  const payer = second;

  return {
    sorted,
    leader,
    second,
    payer,
    top6: sorted.slice(0, 6),
  };
};
