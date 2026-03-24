import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { OperationsService } from "./operations.service";
import { GetOperationsListDto } from "./dto/get-operations-list.dto";
import { GetOperationDto } from "./dto/get-operation.dto";

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
}
