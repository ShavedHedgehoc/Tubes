import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
    description: "Refresh токен пользователя",
  })
  @IsNotEmpty({ message: "Токен не может быть пустым" })
  @IsString({ message: "Токен должен быть строкой" })
  readonly refreshToken: string;
}
