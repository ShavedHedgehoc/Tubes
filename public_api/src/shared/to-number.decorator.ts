import { Transform, TransformFnParams } from "class-transformer";

export function ToNumber() {
  return Transform(
    ({ value }: TransformFnParams): number | string | null | undefined => {
      if (value == null) return value;
      if (typeof value === "number") return value;

      const strValue = String(value).trim();

      if (strValue === "-" || strValue === "—" || strValue === "") {
        return null;
      }

      const normalized = strValue.replace(",", ".");
      const num = Number(normalized);

      return isNaN(num) ? value : num;
    },
  );
}
