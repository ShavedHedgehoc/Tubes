import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { LaboratoryLocksService } from "./laboratory-locks.service";
import { LaboratoryLocksController } from "./laboratory-locks.controller";

@Module({
  providers: [LaboratoryLocksService],
  controllers: [LaboratoryLocksController],
  imports: [PrismaModule],
})
export class LaboratoryLocksModule {}
