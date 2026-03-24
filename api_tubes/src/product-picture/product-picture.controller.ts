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
import { ProductPictureService } from "./product-picture.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateRecordDto } from "./dto/create-record.dto";
import { GetExistingIdsDto } from "./dto/get-existing-ids.dto";
import { DeleteRecordDto } from "./dto/delete-record.dto";

@Controller("product-picture")
export class ProductPictureController {
  constructor(private readonly productPictureService: ProductPictureService) {}

  @ApiOperation({ summary: "Создать запись" })
  @Post()
  createRecord(
    @Body(new ValidationPipe({ transform: true })) dto: CreateRecordDto,
  ) {
    return this.productPictureService.createRecord(dto);
  }

  @ApiOperation({ summary: "Получить изображения по id продукта" })
  @Get()
  getConveyorByName(@Query("product_id") product_id: string) {
    return this.productPictureService.getPicturesByProductId(
      Number(product_id),
    );
  }

  @ApiOperation({ summary: "Получить id файлов по id продукта" })
  @Get("/exists_pictures/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getEmployeeById(@Param() params: GetExistingIdsDto) {
    return this.productPictureService.getExistingFileIds(params.id);
  }

  @ApiOperation({ summary: "Удалить запись" })
  @Delete()
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteRecord(@Query() dto: DeleteRecordDto) {
    return this.productPictureService.deleteRecord(dto);
  }
}
