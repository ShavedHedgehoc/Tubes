import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { OperationsService } from "./operations.service";
import { GetOperationsListDto } from "./dto/get-operations-list.dto";
import { GetOperationDto } from "./dto/get-operation.dto";
import { UpdateOperationActiveStatusDto } from "./dto/update-operation-active-status.dto";

@ApiTags("Операции")
@Controller("operations")
export class OperationsController {
  constructor(private readonly operationService: OperationsService) {}

  @Get()
  @ApiOperation({ summary: "Получить список операций с параметрами" })
  @Get()
  getOperationList(
    @Query(new ValidationPipe({ transform: true })) query: GetOperationsListDto,
  ) {
    return this.operationService.getOperationList(query);
  }

  @ApiOperation({ summary: "Получить операцию по id" })
  @Get("/by_id/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getEmployeeById(@Param() params: GetOperationDto) {
    return this.operationService.getOperationById(params.id);
  }

  @ApiOperation({ summary: "Поменять статус активности" })
  @Patch("/change_banned/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  changeBanned(@Param() params: UpdateOperationActiveStatusDto) {
    return this.operationService.changeActive(params.id);
  }
}
