export function formatTimeOnly(tickItem: Date) {
  const date = new Date(tickItem);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}
