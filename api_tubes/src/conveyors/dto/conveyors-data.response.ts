type State = "idle" | "working" | "finished";

class PostData {
  production: number | null;
  state: State;
  employee: string | null;
}

class ConveyorSummary {
  id: number;
  product_id: number | null;
  product_code: string | null;
  product_name: string | null;
  batch_id: number | null;
  batch_name: string | null;
  plan: number;
  shift: number | null;
  extrusion: PostData | null;
  varnish: PostData | null;
  offset: PostData | null;
  sealant: PostData | null;
}

class ConveyorData {
  id: number;
  name: string;
  summary: ConveyorSummary | null;
}

export class ConveyorsDataResponse {
  conveyors: ConveyorData[];
}
