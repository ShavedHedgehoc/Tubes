import { useQueryStates } from "nuqs";
import { labLockUiSchema } from "./ui-schema";

export function useLabLockUIParams() {
  const [params, setParams] = useQueryStates(labLockUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
