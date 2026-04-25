import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, ValidateIf } from "class-validator";

export class UpdateSummaryDto {
  @ApiProperty({ example: 1, description: "id сводки" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 1000, description: "План" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly plan: number;

  @ApiPropertyOptional({
    example: 2,
    description: "id бригады. Передайте null, чтобы открепить бригаду.",
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @Type(() => Number)
  @IsNumber()
  readonly crew_id?: number | null;
}
