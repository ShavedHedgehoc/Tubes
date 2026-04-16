export type OperationEntity = {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
  isInactive: boolean;
};

type FilePath = {
  id: number;
  filename: string;
  path: string;
  description: string;
};

type OperationPicture = {
  picture_record_id: number;
  picture_order: number;
  picture_file: FilePath;
};

export type OperationRow = OperationEntity & {
  operation_pictures: OperationPicture[];
  post_name: string;
  min_rank_description: string;
};

export type OperationResponse = {
  operations: OperationRow[];
  total: number;
  totalPages: number;
};
