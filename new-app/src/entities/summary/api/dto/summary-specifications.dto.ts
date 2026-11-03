import { SummaryDto } from "./summary.dto";

type Post = {
  id: number;
  value: number;
  name: string;
};

export type SpecificationRow = {
  materialId: number;
  materialCode1C: string;
  materialName: string;
  currentLotId: number | null;
  currentLot: string | null;
  post: Post | null;
};

export type SummarySpecificationsDto = {
  summary: Omit<
    SummaryDto,
    | "production"
    | "productionPerBoxes"
    | "_count"
    | "defectRateGoal"
    | "executionGoal"
    | "unitWeight"
    | "crewName"
  >;
  specifications: SpecificationRow[];
};
