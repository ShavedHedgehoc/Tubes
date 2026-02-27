import { RankDto } from "@/entities/rank/api/dto/rank.dto";

export type EmployeeDto = {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
  rank: RankDto;
};
