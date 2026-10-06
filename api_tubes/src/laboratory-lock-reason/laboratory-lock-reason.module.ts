import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { LaboratoryLockReasonsService } from "./laboratory-lock-reasons.service";
import { LaboratoryLockReasonsController } from "./laboratory-lock-reasons.controller";

@Module({
  providers: [LaboratoryLockReasonsService],
  controllers: [LaboratoryLockReasonsController],
  imports: [PrismaModule],
})
export class LaboratoryLockReasonsModule {}
