import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { StatusesService } from "./statuses.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateStatusDto } from "./dto/create-status.dto";
import { GetStatusesDto } from "./dto/get-statuses.dto";

@Controller("statuses")
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @ApiOperation({ summary: "Получить статусы" })
  @Get()
  getStatuses(
    @Query(new ValidationPipe({ transform: true })) query: GetStatusesDto,
  ) {
    return this.statusesService.getStatuses(query);
  }

  @ApiOperation({ summary: "Создать запись статуса" })
  @Post()
  createStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createStatus(dto);
  }
}
