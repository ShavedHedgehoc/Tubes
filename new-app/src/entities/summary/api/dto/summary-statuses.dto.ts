import { SummaryDto } from "./summary.dto";

type StatusDto = {
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

type Employee = {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
};

type Operation = {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
};

type Post = {
  id: number;
  value: number;
  name: string;
};

export type StatusRow = StatusDto & {
  employee: Employee | null;
  operation: Operation | null;
  post: Post;
};

export type SummaryStatusesDto = {
  summary: Omit<SummaryDto, "_count">;
  statuses: StatusRow[];
};
