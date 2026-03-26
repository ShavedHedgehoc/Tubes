import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetPostStatusesDto {
  @ApiProperty({ example: 1, description: "id записи" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly summary_id: number;
  @ApiProperty({ example: 1, description: "номер поста" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly post_val: number;
}
