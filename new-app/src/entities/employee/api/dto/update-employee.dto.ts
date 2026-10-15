export type UpdateEmployeeDto = {
  id: string;
  name: string;
  barcode: string;
  rank_id: number;
  allowed_post_ids: number[];
};
