import { useQueryStates } from "nuqs";
import { userUiSchema } from "../model/search-params";

export function useUserUiParams() {
  const [params, setParams] = useQueryStates(userUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
