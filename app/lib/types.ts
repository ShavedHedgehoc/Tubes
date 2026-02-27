type IProduct = {
  id: number;
  code: string;
  marking: string;
  name: string;
};

type IBatch = {
  id: number;
  name: string;
};

type IConveyor = {
  id: number;
  name: string;
};

type TubePostStatusRecordCount = {
  extrusion_statuses: number;
  varnish_statuses: number;
  offset_statuses: number;
  sealant_statuses: number;
};

type ITubeRecordRow = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product: IProduct;
  batch: IBatch;
  conveyor: IConveyor;
  date: Date;
  shift: number;
  _count: TubePostStatusRecordCount;
};

export type TubeRecordsListResponce = {
  rows: ITubeRecordRow[] | [];
  total: number;
};
