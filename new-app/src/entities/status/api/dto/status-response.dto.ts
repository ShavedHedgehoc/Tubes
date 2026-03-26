import { StatusDto } from "./status.dto";

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

type StatusRow = StatusDto & {
  employee: Employee | null;
  operation: Operation | null;
};
export type StatusResponseDto = {
  statuses: StatusRow[];
};
