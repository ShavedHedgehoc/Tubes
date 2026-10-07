import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ParamsService } from "./params.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
import { CreateVarnishEntryDto } from "./dto/create-varnish-entry.dto";
import { CreateOffsetEntryDto } from "./dto/create-offset-entry.dto";
import { CreateSealantEntryDto } from "./dto/create-sealant-entry.dto";
import { GetDetailDto } from "./dto/get-datail.dto";

@ApiTags("Параметры")
@Controller("params")
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @ApiOperation({ summary: "Создать запись параметров поста 1" })
  @Post("extrusion")
  createExtrusionParamsEntry(@Body() dto: CreateExtrusionEntryDto) {
    return this.paramsService.createExtrusionEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 2" })
  @Post("varnish")
  createVarnishParamsEntry(@Body() dto: CreateVarnishEntryDto) {
    return this.paramsService.createVarnishEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 3" })
  @Post("offset")
  createOffsetParamsEntry(@Body() dto: CreateOffsetEntryDto) {
    return this.paramsService.createOffsetEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 4" })
  @Post("sealant")
  createSealantParamsEntry(@Body() dto: CreateSealantEntryDto) {
    return this.paramsService.createSealantEntry(dto);
  }

  @ApiOperation({ summary: "Получить детали по id" })
  @Get("extrusion/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getExtrusionParamById(@Param() params: GetDetailDto) {
    return this.paramsService.getExtrusionById(params.id);
  }
  @ApiOperation({ summary: "Получить детали по id" })
  @Get("varnish/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getVarnishParamById(@Param() params: GetDetailDto) {
    return this.paramsService.getVarnishById(params.id);
  }
  @ApiOperation({ summary: "Получить детали по id" })
  @Get("offset/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getOffsetParamById(@Param() params: GetDetailDto) {
    return this.paramsService.getOffsetById(params.id);
  }
  @ApiOperation({ summary: "Получить детали по id" })
  @Get("sealant/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getSealantParamById(@Param() params: GetDetailDto) {
    return this.paramsService.getSealantById(params.id);
  }
}
