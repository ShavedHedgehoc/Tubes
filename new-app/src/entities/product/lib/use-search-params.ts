import { useQueryStates } from "nuqs";
import { productParamsSchema } from "../model";

export function useProductSearchParams() {
  const [params, setParams] = useQueryStates(productParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
