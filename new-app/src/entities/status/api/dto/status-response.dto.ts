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

type Maintenance = {
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

type MaintenanceSession = {
  id: number;
  maintenance_id: number;
  post_id: number;
  start_time: Date;
  end_time: Date;
  total_duration: number;
  work_duration: number;
  maintenance: Maintenance;
};

type StatusRow = StatusDto & {
  employee: Employee | null;
  operation: Operation | null;
  maintenance_session: MaintenanceSession | null;
  post: Post;
};
export type StatusResponseDto = {
  statuses: StatusRow[];
};
