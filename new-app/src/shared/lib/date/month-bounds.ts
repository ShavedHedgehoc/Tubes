export const getMonthBounds = (now = new Date()) => {
  return {
    firstDay: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0),
    lastDay: new Date(now.getFullYear(), now.getMonth() + 1, 0, 0, 0, 0),
  };
};

export const getToday = (now = new Date()) => {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
};
