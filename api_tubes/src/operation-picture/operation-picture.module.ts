import { Module } from "@nestjs/common";
import { OperationPictureService } from "./operation-picture.service";
import { OperationPictureController } from "./operation-picture.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [OperationPictureService],
  controllers: [OperationPictureController],
  imports: [PrismaModule],
})
export class OperationPictureModule {}
