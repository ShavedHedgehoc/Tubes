import { useQueryStates } from "nuqs";
import { operationParamsSchema } from "../model";

export function useOperationSearchParams() {
  const [params, setParams] = useQueryStates(operationParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
