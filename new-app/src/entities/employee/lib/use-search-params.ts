import { useQueryStates } from "nuqs";
import { employeeParamsSchema } from "../model";

export function useEmployeeSearchParams() {
  const [params, setParams] = useQueryStates(employeeParamsSchema, {
    shallow: false,
  });
  return { params, setParams };
}
