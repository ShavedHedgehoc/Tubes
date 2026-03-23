import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetOperationDto {
  @ApiProperty({ example: 1, description: "id операции" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
