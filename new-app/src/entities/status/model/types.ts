export type StatusEntity = {
  id: number;
  summary_id: number;
  post_id: number;
  post_val: number;
  counter_value: number;
  operation_id: number | null;
  operation_description: string | null;
  maintenance_session_id: number | null;
  maintenance_description: string | null;
  idle: false;
  employee_id: number | null;
  employee_name: string | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
};

export type StatusResponse = {
  statuses: StatusEntity[];
};
