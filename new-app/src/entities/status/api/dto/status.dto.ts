export type StatusDto = {
  id: number;
  summary_id: number;
  post_id: number;
  counter_value: number;
  operation_id: number | null;
  idle: false;
  employee_id: number | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
};
