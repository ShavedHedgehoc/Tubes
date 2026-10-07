import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  Length,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: "id пользователя" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя" })
  @IsString({ message: "Имя должно быть строкой" })
  @Length(1, 60, {
    message: "Имя пользователя должно содержать от 1 до 60 символов",
  })
  readonly name: string;
  @ApiProperty({
    example: "ivanov@mail.ru",
    description: "Электронная почта пользователя",
  })
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
}
