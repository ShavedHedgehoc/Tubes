import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecordDto } from "./dto/create-record.dto";
import { DeleteRecordDto } from "./dto/delete-record.dto";

@Injectable()
export class ProductPictureService {
  constructor(private prisma: PrismaService) {}

  async createRecord(dto: CreateRecordDto) {
    const lastPic = await this.prisma.productPicture.findFirst({
      where: { product_id: dto.product_id },
      orderBy: { order: "desc" },
    });

    const newOrder = lastPic ? lastPic.order + 1 : 0;

    return this.prisma.productPicture.create({
      data: {
        product_id: dto.product_id,
        file_path_id: dto.file_path_id,
        order: newOrder,
      },
    });
  }

  async deleteRecord(dto: DeleteRecordDto) {
    return this.prisma.productPicture.delete({
      where: {
        product_id_file_path_id: {
          product_id: dto.product_id,
          file_path_id: dto.file_path_id,
        },
      },
    });
  }

  async getExistingFileIds(id: number) {
    const ids = await this.prisma.productPicture.findMany({
      where: { product_id: id },
    });
    const mappedIds = ids.map((i) => i.file_path_id);
    return { existingIds: mappedIds };
  }

  async getPicturesByProductId(product_id: number) {
    const pictures = await this.prisma.productPicture.findMany({
      where: { product_id: product_id },
      include: { file_path: true },
    });
    const mappedPictures = pictures.map((picture) => {
      return {
        id: picture.id,
        product_id: picture.product_id,
        src: picture.file_path.name,
      };
    });
    return { pictures: mappedPictures };
  }
}
