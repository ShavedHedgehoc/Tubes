import { useQueryStates } from "nuqs";
import { statusUiSchema } from "../model/search-params";

export function useStatusUiParams() {
  const [params, setParams] = useQueryStates(statusUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
