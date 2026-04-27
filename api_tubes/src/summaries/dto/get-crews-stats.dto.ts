import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class GetCrewsStatsDto {
  @ApiProperty({ description: "Дата начала", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty({ description: "Дата окончания", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly end_date: Date;
}
