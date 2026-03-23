import { Body, Controller, Post } from "@nestjs/common";
import { StatusesService } from "./statuses.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateStatusDto } from "./dto/create-status.dto";

@Controller("statuses")
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @ApiOperation({ summary: "Создать запись статуса" })
  @Post()
  createStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createStatus(dto);
  }
}
