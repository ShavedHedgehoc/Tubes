import { ApiProperty } from "@nestjs/swagger";

class Batch {
  id: number;
  name: string;
}

class Product {
  id: number;
  code: string;
  marking: string;
  name: string;
}

class SummaryRow {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  shift: number;
  product: Product;
  batch: Batch;
}

export class AvailableSummariesResponse {
  @ApiProperty({ isArray: true })
  summaries: SummaryRow[];
}
