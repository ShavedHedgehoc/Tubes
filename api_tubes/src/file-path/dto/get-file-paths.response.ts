import { ApiProperty } from "@nestjs/swagger";

export class FilePathRow {
    id: number;
    name: string;
    path: string
    description: string;
}

export class GetFilePathsResponse {
    @ApiProperty({ isArray: true })
    rows: FilePathRow[];
    total: number;
}
