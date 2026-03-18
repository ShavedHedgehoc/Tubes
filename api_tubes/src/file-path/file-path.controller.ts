import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { FilePathService } from './file-path.service';
import { ApiOperation } from '@nestjs/swagger';
import { GetFilePathsDto } from './dto/get-file-paths.dto';
import { GetFilePathsResponse } from './dto/get-file-paths.response';

@Controller('file-path')
export class FilePathController {
    constructor(private readonly filePathService: FilePathService) { }
    @ApiOperation({ summary: "Получить список файлов" })
    @Get()
    getFilePaths(
        @Query(new ValidationPipe({ transform: true })) query: GetFilePathsDto,
    ): Promise<GetFilePathsResponse> {
        return this.filePathService.getFilePaths(query)
    }

}
