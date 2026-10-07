import { Module } from "@nestjs/common";
import { ProductPictureService } from "./product-picture.service";
import { ProductPictureController } from "./product-picture.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [ProductPictureService],
  controllers: [ProductPictureController],
  imports: [PrismaModule],
})
export class ProductPictureModule {}
