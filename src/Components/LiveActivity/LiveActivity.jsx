import "./LiveActivity.scss";

const LiveActivity = () => {
  return (
    <div className="live-inline">
      <span className="live-dot live-dot--green" />
      <span className="live-text">124 онлайн</span>

      <span className="live-dot live-dot--orange" />
      <span className="live-text">+17 / мин</span>

      <span className="live-dot live-dot--blue" />
      <span className="live-event">
        PlayerX выиграл AWP | Asiimov за 300 ₽
      </span>
    </div>
  );
};

export default LiveActivity;
