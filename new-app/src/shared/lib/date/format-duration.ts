export const formatDuration = (ms: number) => {
  const h = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
};
