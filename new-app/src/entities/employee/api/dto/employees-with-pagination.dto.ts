import { EmployeeDto } from "./employee.dto";

export type EmployeesWithPaginationDto = {
  employees: EmployeeDto[];
  total: number;
};
