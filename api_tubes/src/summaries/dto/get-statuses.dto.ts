import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetStatusesDto {
  @ApiProperty({ example: 1, description: "id записи" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly summary_id: number;
}
