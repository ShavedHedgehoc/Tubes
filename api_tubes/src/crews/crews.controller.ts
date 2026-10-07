import { Controller, Get } from "@nestjs/common";
import { CrewsService } from "./crews.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("crews")
export class CrewsController {
  constructor(private readonly crewsService: CrewsService) {}

  @ApiOperation({ summary: "Получить бригады" })
  @Get()
  getCrews() {
    return this.crewsService.getCrews();
  }
}
