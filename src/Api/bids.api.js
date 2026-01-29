import { http } from "./http.js";

export const getMyBids = async ({ page = 1, type = null }) => {
  const params = { page };
  if (type) params.type = type;

  const { data } = await http.get("/api/bids/my", { params });
  return data;
};
