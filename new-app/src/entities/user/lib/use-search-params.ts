import { useQueryStates } from "nuqs";
import { userParamsSchema } from "../model/search-params";

export function useUserSearchParams() {
  const [params, setParams] = useQueryStates(userParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
