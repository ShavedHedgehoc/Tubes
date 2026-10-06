import { ApiProperty } from "@nestjs/swagger";
class StatusDto {
  id: number;
  summary_id: number;
  post_id: number;
  counter_value: number;
  operation_id: number | null;
  maintenance_session_id: number | null;
  idle: boolean;
  is_locked: boolean;
  employee_id: number | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
  extrusion_param_id: number | null;
  varnish_param_id: number | null;
  offset_param_id: number | null;
  sealant_param_id: number | null;
}

class Employee {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
}
class Operation {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
}
class Maintenance {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
}

class MaintenanceSession {
  id: number;
  maintenance_id: number;
  post_id: number;
  start_time: Date;
  end_time: Date | null;
  total_duration: number | null;
  work_duration: number | null;
  maintenance: Maintenance;
}
class LaboratoryLockReason {
  id: number;
  value: string;
}

class LaboratoryAssistant {
  id: number;
  name: string;
}

class User {
  id: number;
  name: string;
}

type LaboratoryLock = {
  id: number;
  laboratory_lock_reason_id: number;
  laboratory_assistant_id: number | null;
  user_id: number | null;
  createdAt: Date;
  summary_id: number;
  post_id: number;
  is_active: boolean;
  closedAt: Date | null;
  laboratory_assistant: LaboratoryAssistant;
  user: User;
  laboratory_lock_reason: LaboratoryLockReason;
};

class Post {
  id: number;
  value: number;
  name: string;
}

export class StatusRow extends StatusDto {
  employee: Employee | null;
  operation: Operation | null;
  maintenance_session: MaintenanceSession | null;
  laboratory_lock: LaboratoryLock | null;
  post: Post;
}

export class PostStatusesResponse {
  @ApiProperty({ isArray: true })
  statuses: StatusRow[];
}
