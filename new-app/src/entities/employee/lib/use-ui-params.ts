import { employeeUiSchema } from "../model";
import { useQueryStates } from "nuqs";

export function useEmployeeUiParams() {
  const [params, setParams] = useQueryStates(employeeUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
