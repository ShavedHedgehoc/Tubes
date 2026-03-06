import { useQueryStates } from "nuqs";
import { tresholdParamsSchema } from "@/entities/treshold";

export function useTresholdSearchParams() {
  const [params, setParams] = useQueryStates(tresholdParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
