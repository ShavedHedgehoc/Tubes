import { parse, isValid } from "date-fns";

export const parseDate = (dateStr: string) => {
  const d = parse(dateStr, "yyyy-MM-dd", new Date());
  return isValid(d) ? d : undefined;
};
