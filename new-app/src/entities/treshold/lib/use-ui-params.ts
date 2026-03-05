import { useQueryStates } from "nuqs";
import { tresholdUiSchema } from "../model";

export function useTresholdUiParams() {
  const [params, setParams] = useQueryStates(tresholdUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
