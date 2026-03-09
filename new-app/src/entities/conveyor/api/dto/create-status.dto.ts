export type CreateStatusDto = {
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  finished: boolean;
  employee_id: number | null;
  defect_value?: string;
};
