import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ChangeLockDto } from "./dto/change-lock.dto";
import { LaboratoryLocksService } from "./laboratory-locks.service";

@ApiTags("Блокировки лаборатории")
@Controller("laboratory-lock")
export class LaboratoryLocksController {
  constructor(
    private readonly laboratoryLocksService: LaboratoryLocksService,
  ) {}

  @ApiOperation({
    summary: "Установить/снять лабораторную блокировку поста",
    description:
      "Создает запись блокировки/разблокировки в таблице Status для поста с переданным номером.",
  })
  @Post("change-lock")
  changeLock(
    @Body(new ValidationPipe({ transform: true })) dto: ChangeLockDto,
  ) {
    return this.laboratoryLocksService.changeLockState(dto);
  }
}
