import { Module } from "@nestjs/common";
import { MaintenanceLogService } from "./maintenance-log.service";
import { MaintenanceLogController } from "./maintenance-log.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [MaintenanceLogService],
  controllers: [MaintenanceLogController],
  imports: [PrismaModule],
})
export class MaintenanceLogModule {}
