import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ChangeProductWeightdDto {
  @ApiProperty({ example: 1, description: "id сводки" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  product_id: number;
  @ApiProperty({ example: 1000, description: "План" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  weight: number;
}
