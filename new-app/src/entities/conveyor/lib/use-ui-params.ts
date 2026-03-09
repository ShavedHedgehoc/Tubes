import { useQueryStates } from "nuqs";
import { conveyorUiSchema } from "../model";

export function useConveyorUiParams() {
  const [params, setParams] = useQueryStates(conveyorUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
