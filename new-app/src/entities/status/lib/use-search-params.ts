import { useQueryStates } from "nuqs";
import { statusParamsSchema } from "../model";

export function useStatusSearchParams() {
  const [params, setParams] = useQueryStates(statusParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
