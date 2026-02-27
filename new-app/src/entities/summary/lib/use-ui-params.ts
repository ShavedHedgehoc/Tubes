import { summaryUiSchema } from "@/entities/summary";
import { useQueryStates } from "nuqs";

export function useSummaryUiParams() {
  const [params, setParams] = useQueryStates(summaryUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
