export const getTimeLeft = (endsAt) => {
  const diff = new Date(endsAt) - new Date();

  if (diff <= 0) return "Завершён";

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}ч ${minutes}м ${seconds}с`;
};