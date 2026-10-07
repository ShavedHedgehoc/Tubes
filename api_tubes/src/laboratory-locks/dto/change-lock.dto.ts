import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class ChangeLockDto {
  @ApiProperty({ description: "id сводки", example: "1" })
  @IsInt()
  @IsNotEmpty()
  readonly summary_id: number;

  @ApiProperty({ description: "номер поста", example: "1" })
  @IsInt()
  @IsNotEmpty()
  readonly post_val: number;

  @ApiProperty({ description: "id причины блокировки", example: "1" })
  @IsNumber()
  @IsOptional()
  readonly lock_reason_id: number;

  @ApiProperty({ description: "id пользователя", example: 1 })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ description: "Заблокировать", example: true })
  @IsBoolean()
  readonly state: boolean;
}
