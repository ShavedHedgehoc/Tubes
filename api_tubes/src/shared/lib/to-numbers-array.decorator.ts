import { Transform } from "class-transformer";

export function ToNumbersArray() {
  return Transform(({ value }: { value: unknown }) => {
    if (value === null || value === undefined || value === "") return [];
    const rawArray =
      typeof value === "string" ? value.split(",").map((v) => v.trim()) : value;

    if (Array.isArray(rawArray)) {
      return rawArray
        .map((item) => Number(item))
        .filter((item) => !isNaN(item) && typeof item === "number");
    }
    return [];
  });
}
