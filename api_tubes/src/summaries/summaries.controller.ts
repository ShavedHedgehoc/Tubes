import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SummariesService } from "./summaries.service";
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { DeleteSummaryDto } from "./dto/delete-summary.dto";
import { AvailableSummariesResponse } from "./dto/available-summaries.response";
// import { GetDetailDto } from "./dto/get-detail.dto";

//move to dto
// export class GetDetailDto {
//   @ApiProperty({ example: 1, description: "id записи" })
//   @IsNotEmpty()
//   @Type(() => Number)
//   @IsNumber()
//   readonly id: number;
// }

@ApiTags("Сводки")
@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}

  @ApiOperation({ summary: "Получить список сводок с параметрами" })
  @Get()
  getSummaryList(
    @Query(new ValidationPipe({ transform: true })) query: GetSummariesListDto,
  ) {
    return this.summaryService.getSummariesList(query);
  }

  // !!!!!!!!!!!!
  // Надо добавить ручку для формы редактирования

  // @ApiOperation({
  //   summary: "Получить детали cводку по id (для подробного отчета)",
  // })
  // @Get("detail/:id")
  // @UsePipes(new ValidationPipe({ transform: true }))
  // getSummaryById(@Param() params: GetDetailDto) {
  //   return this.summaryService.getSummaryById(params.id);
  // }

  @ApiOperation({ summary: "Получить активную сводку по id конвейера" })
  @Get("/active")
  getActiveSummaryRecordByConveyorId(
    @Query("conveyor_id") conveyor_id: string,
  ) {
    return this.summaryService.getActiveSummaryRecordByConveyorId(
      Number(conveyor_id),
    );
  }

  @ApiOperation({ summary: "Получить доступные сводки по id конвейера" })
  @Get("/available")
  getAvailableSummariesRecordByConveyorId(
    @Query("conveyor_id") conveyor_id: string,
  ): Promise<AvailableSummariesResponse> {
    return this.summaryService.getAvailableSummariesRecordByConveyorId(
      Number(conveyor_id),
    );
  }

  @ApiOperation({ summary: "Завершить запись сводки" })
  @Patch("/set_finish")
  finishSummary(@Body() dto: ChangeSummaryStateDto) {
    return this.summaryService.finishSummary(dto);
  }

  @ApiOperation({ summary: "Активировать запись сводки" })
  @Patch("/set_active")
  startSummary(@Body() dto: ChangeSummaryStateDto) {
    return this.summaryService.startSummary(dto);
  }

  @ApiOperation({ summary: "Удалить запись сводки" })
  @Delete("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteSummary(@Param() params: DeleteSummaryDto) {
    return this.summaryService.deleteSummary(params.id);
  }
  // Для нового и старого приложения
  @ApiOperation({ summary: "Создать записи сводок" })
  @Post()
  bulkCreateSummaries(@Body() dto: CreateSummaryDto) {
    return this.summaryService.bulkCreateSummariesNew(dto);
  }
}
