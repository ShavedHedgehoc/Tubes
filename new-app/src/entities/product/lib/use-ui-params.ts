import { productUiSchema } from "../model";
import { useQueryStates } from "nuqs";

export function useProductUiParams() {
  const [params, setParams] = useQueryStates(productUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
