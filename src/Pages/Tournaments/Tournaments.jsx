import { useEffect, useState } from "react";
import { getTournaments, joinTournament } from "../../Api/tournaments.api";
import "./Tournaments.scss";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    getTournaments().then(setTournaments);
  }, []);

  const handleJoin = async (id) => {
    try {
      setJoiningId(id);
      await joinTournament(id);
      setTournaments(await getTournaments());
    } catch {
      alert("Вы уже участвуете");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="tournaments-page">
      <header className="tournaments-head">
        <h1>Турниры</h1>
        <p>Соревнуйтесь с другими участниками и занимайте призовые места.</p>
      </header>

      <div className="tournament-list">
        {tournaments.map((t) => (
          <div key={t.id} className="tournament-card">
            <div className="tournament-card__main">
              <div className="tournament-name">{t.title}</div>
              <span className={`status ${t.status}`}>{t.status}</span>
            </div>

            <div className="tournament-meta">
              <span>Игроков: {t.players}/{t.max_players}</span>
              <span>Приз: {t.prize}</span>
            </div>

            {t.status === "registration" && (
              <button
                className="btn primary"
                disabled={joiningId === t.id}
                onClick={() => handleJoin(t.id)}
              >
                {joiningId === t.id ? "Регистрация..." : "Участвовать"}
              </button>
            )}

            {t.status === "active" && (
              <button className="btn ghost" disabled>
                Турнир идёт
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
