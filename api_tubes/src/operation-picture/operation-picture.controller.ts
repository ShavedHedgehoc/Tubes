import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { OperationPictureService } from "./operation-picture.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateOperationPictureDto } from "./dto/create-operation-picture.dto";
import { DeleteOperationPictureDto } from "./dto/delete-operation-picture.dto";
import { GetOperationpictureExistingIdsDto } from "./dto/get-operation-picture-existing-ids.dto";

@Controller("operation-picture")
export class OperationPictureController {
  constructor(
    private readonly operationPictureService: OperationPictureService,
  ) {}

  @ApiOperation({ summary: "Создать запись" })
  @Post()
  createRecord(
    @Body(new ValidationPipe({ transform: true }))
    dto: CreateOperationPictureDto,
  ) {
    return this.operationPictureService.createRecord(dto);
  }

  @ApiOperation({ summary: "Получить изображения по id продукта" })
  @Get()
  getConveyorByName(@Query("operation_id") operation_id: string) {
    return this.operationPictureService.getPicturesByOperationId(
      Number(operation_id),
    );
  }

  @ApiOperation({ summary: "Получить id файлов по id продукта" })
  @Get("/exists_pictures/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getEmployeeById(@Param() params: GetOperationpictureExistingIdsDto) {
    return this.operationPictureService.getExistingFileIds(params.id);
  }

  @ApiOperation({ summary: "Удалить запись" })
  @Delete()
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteRecord(@Query() dto: DeleteOperationPictureDto) {
    return this.operationPictureService.deleteRecord(dto);
  }
}
