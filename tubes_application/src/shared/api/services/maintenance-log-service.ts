import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface UpdateMaintenanceLogDto {
  id: number;
  start_time: Date | null;
  end_time: Date | null;
}

interface IMaintenanceLog {
  id: number;
  session_id: number;
  title: string;
  start_time: Date | null;
  end_time: Date | null;
  is_done: boolean;
}

export default class MaintenanceLogService {
  static async updateMaintenanceLog(
    dto: UpdateMaintenanceLogDto,
  ): Promise<IMaintenanceLog> {
    const res = await $api.patch(ApiRoutes.UPDATE_MAINTENANCE_LOG, dto);
    return res.data;
  }
}
