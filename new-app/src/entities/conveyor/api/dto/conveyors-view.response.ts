type State = "idle" | "working" | "finished";

export type PostData = {
  production: number | null;
  state: State;
  employee: string | null;
};

type ConveyorSummary = {
  id: number;
  product_id: number | null;
  product_code: string | null;
  product_name: string | null;
  batch_id: number | null;
  batch_name: string | null;
  shift: number | null;
  plan: number;
  extrusion: PostData | null;
  varnish: PostData | null;
  offset: PostData | null;
  sealant: PostData | null;
};

type ConveyorData = {
  id: number;
  name: string;
  summary: ConveyorSummary | null;
};

export type ConveyorsDataResponse = {
  conveyors: ConveyorData[];
};
