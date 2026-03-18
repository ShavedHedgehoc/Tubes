import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [UploadController],
  imports: [PrismaModule],
})
export class UploadModule { }
