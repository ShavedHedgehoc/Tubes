import { IsOptional, IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLogDto {
  @ApiProperty({ example: "123" })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly start_time?: string | null;

  @IsOptional()
  @IsString()
  readonly end_time?: string | null;
}
