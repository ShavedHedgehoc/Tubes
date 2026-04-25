import { Module } from "@nestjs/common";
import { CrewsService } from "./crews.service";
import { CrewsController } from "./crews.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [CrewsService],
  controllers: [CrewsController],
  imports: [PrismaModule],
})
export class CrewsModule {}
