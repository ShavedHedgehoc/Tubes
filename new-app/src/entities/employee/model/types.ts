import { PostEntity } from "@/entities/post";
import { RankEntity } from "@/entities/rank/model/types";

export type EmployeeEntity = {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
  rank: RankEntity;
  allowed_posts: PostEntity[];
};

export type EmployeesResponse = {
  employees: EmployeeEntity[];
  total: number;
  totalPages: number;
};
