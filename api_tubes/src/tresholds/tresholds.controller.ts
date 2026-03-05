import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { TresholdsService } from "./tresholds.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateTresholdsBulkDto } from "./dto/create-tresholds-bulk.dto";
import { GetTresholdsDto } from "./dto/get-tresholds.dto";
import { GetTresholdsResponse } from "./dto/get-tresholds.response";

@ApiTags("Границы параметров")
@Controller("tresholds")
export class TresholdsController {
  constructor(private readonly tresholdsService: TresholdsService) {}

  @ApiOperation({ summary: "Получить все границы" })
  @Get()
  getTresholds(
    @Query(new ValidationPipe({ transform: true })) query: GetTresholdsDto,
  ): Promise<GetTresholdsResponse> {
    return this.tresholdsService.getAllTresholds(query);
  }

  @ApiOperation({ summary: "Создать все границы" })
  @Post()
  createTresholds(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: CreateTresholdsBulkDto,
  ) {
    return this.tresholdsService.bulkCreateTreholds(dto);
  }
}
