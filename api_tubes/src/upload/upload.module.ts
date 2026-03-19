import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  imports: [PrismaModule],
  providers: [UploadService],
})
export class UploadModule { }
