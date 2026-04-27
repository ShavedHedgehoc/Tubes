import { Module } from "@nestjs/common";
import { SummariesService } from "./summaries.service";
import { SummariesController } from "./summaries.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { DataService } from "./data.service";
import { MutationService } from "./mutation.service";
import { ChartDataService } from "./chart-data.service";

@Module({
  providers: [SummariesService, DataService, MutationService, ChartDataService],
  controllers: [SummariesController],
  imports: [PrismaModule],
})
export class SummariesModule {}
