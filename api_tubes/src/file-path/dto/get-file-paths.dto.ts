import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetFilePathsDto {
    @ApiPropertyOptional({
        description: "Имя файла",
    })
    @IsString()
    @IsOptional()
    readonly filename?: string;

    @ApiProperty({
        description: "На странице",
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    readonly limit: number;

    @ApiProperty({
        description: "Страница",
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    readonly page: number;
}
