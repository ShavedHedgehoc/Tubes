import { CreateStatusDto } from "../api/dto/create-status.dto";

type ConveyorEntity = {
  id: number;
  name: string;
};
type PostState = "idle" | "working" | "finished";

type PostData = {
  productionValue: number | null;
  postState: PostState;
  employeeName: string | null;
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

export type ConveyorData = ConveyorEntity & {
  summary: ConveyorSummary | null;
};

export type ConveyorsViewResponse = {
  conveyors: ConveyorData[];
};

export type CreatePostStatusData = { postId: number } & CreateStatusDto;
