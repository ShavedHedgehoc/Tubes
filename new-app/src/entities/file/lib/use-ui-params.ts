import { useQueryStates } from "nuqs";
import { fileUiSchema } from "../model";

export function useFileUiParams() {
  const [params, setParams] = useQueryStates(fileUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
