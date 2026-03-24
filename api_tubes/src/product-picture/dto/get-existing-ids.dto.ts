import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetExistingIdsDto {
  @ApiProperty({ example: 1, description: "id продукта" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
