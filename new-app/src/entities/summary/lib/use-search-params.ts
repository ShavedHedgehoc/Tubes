import { summaryParamsSchema } from "@/entities/summary";
import { useQueryStates } from "nuqs";

export function useSummarySearchParams() {
  const [params, setParams] = useQueryStates(summaryParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
