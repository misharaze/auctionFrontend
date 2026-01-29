import { http } from "./http";

export const getTournaments = async () => {
  const { data } = await http.get("/api/tournaments");
  return data;
};

export const joinTournament = async (id) => {
  await http.post(`/api/tournaments/${id}/join`);
};
