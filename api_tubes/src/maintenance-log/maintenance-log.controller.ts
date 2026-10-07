import {
  Body,
  Controller,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { MaintenanceLogService } from "./maintenance-log.service";
import { UpdateLogDto } from "./dto/update-log.dto";

@Controller("maintenance-log")
export class MaintenanceLogController {
  constructor(private readonly maintenanceLogService: MaintenanceLogService) {}

  @ApiOperation({ summary: "Запуск/остановка задачи" })
  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  updateTask(@Body() dto: UpdateLogDto) {
    return this.maintenanceLogService.updateLog(dto);
  }
}
