export const parseValue = (
  val: string | number | null | undefined,
): number | null => {
  return val !== null && val !== undefined && val !== "" ? Number(val) : null;
};
