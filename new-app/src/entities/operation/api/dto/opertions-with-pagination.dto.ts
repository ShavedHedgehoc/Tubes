import { OperationWithPicturesDto } from "./operation.dto";

export type OperationsWithPaginationDto = {
  rows: OperationWithPicturesDto[];
  total: number;
};
