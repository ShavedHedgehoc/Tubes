export const formatNumber = (value: number | string) => {
  const num = Number(value);
  if (isNaN(num)) return "0";

  return new Intl.NumberFormat("ru-RU").format(num);
};
