import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IOperation {
  id: number;
  value: string;
  description: string;
  min_rank: number;
}

export default class OperationService {
  static async getOperationById(id: string | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_OPERATIONS}/${id}`);
    return res.data;
  }
}
