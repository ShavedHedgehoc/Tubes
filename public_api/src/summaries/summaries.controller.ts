import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { SummariesService } from "./summaries.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { SummariesListResponse } from "./dto/summaries-list.response";

@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}

  @ApiOperation({ summary: "Получить список сводок" })
  @ApiOkResponse({ type: SummariesListResponse })
  @Get()
  getList(
    @Query(new ValidationPipe({ transform: true })) query: GetSummariesListDto,
  ): Promise<SummariesListResponse> {
    return this.summaryService.getList(query);
  }
}
