import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface CreateStatusDto {
  summary_id: number;
  post_val: number;
  operation_id: number | null;
  idle: boolean;
  finished: boolean;
  employee_id: number;
  defect_value?: string;
}

export interface IStatusResponce {
  id: number;
  summary_id: number;
  post_id: number;
  operation_id: number | null;
  idle: boolean;
  employee_id: number;
  finished: boolean;
  createdAt: Date;
}

export default class StatusService {
  static async createStatus(dto: CreateStatusDto): Promise<IStatusResponce> {
    const res = await $api.post(`${ApiRoutes.CREATE_STATUS}`, dto);
    return res.data;
  }
}
