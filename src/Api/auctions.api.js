import { http } from "./http.js";
import { getAccessToken } from "../auth/tokenService.js";

/**
 * Получить список аукционов
 */
export const getAuctions = async () => {
  const res = await http.get("/api/auctions");

  if (!Array.isArray(res.data)) {
    console.error("Auctions API returned non-array:", res.data);
    return [];
  }

  return res.data;
};

/**
 * Получить один аукцион по id
 */
export const getAuctionById = (id) => {
  return http.get(`/api/auctions/${id}`);
};

/**
 * Сделать ставку (🔥 ИСПРАВЛЕНО)
 */
export const placeBid = ({ auctionId, amount }) => {
  const token = getAccessToken();

  return http.post(
    `/api/auctions/${auctionId}/bid`,
    { amount: Number(amount) },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
