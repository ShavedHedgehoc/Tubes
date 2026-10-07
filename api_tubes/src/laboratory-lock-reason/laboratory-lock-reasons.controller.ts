import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { LaboratoryLockReasonsService } from "./laboratory-lock-reasons.service";
import { ValidationExceptionFilter } from "src/validation-exception-filter";
import { CreateLaboratoryLockReasonDto } from "./dto/create-laboratory-lock-reason.dto";

@ApiTags("Причины блокировок")
@Controller("laboratory-lock-reasons")
export class LaboratoryLockReasonsController {
  constructor(
    private readonly laboratoryLockReasonsService: LaboratoryLockReasonsService,
  ) {}

  @Get()
  getAllLabLockReasons() {
    return this.laboratoryLockReasonsService.getAllLabLockReasons();
  }

  @ApiOperation({ summary: "Создать причину" })
  @Post()
  @UseFilters(new ValidationExceptionFilter())
  createReason(
    @Body(new ValidationPipe({ transform: true }))
    dto: CreateLaboratoryLockReasonDto,
  ) {
    return this.laboratoryLockReasonsService.createReason(dto);
  }
}
