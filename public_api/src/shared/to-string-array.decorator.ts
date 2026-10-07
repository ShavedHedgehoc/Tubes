import { Transform } from "class-transformer";

export function ToStringArray() {
  return Transform(({ value }: { value: unknown }) => {
    if (value === null || value === undefined || value === "") return [];

    const rawArray = typeof value === "string" ? value.split(",") : value;

    if (Array.isArray(rawArray)) {
      return rawArray
        .map((item) => String(item).trim())
        .filter((item) => item !== "");
    }

    return [];
  });
}
