import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOperationPictureDto } from "./dto/create-operation-picture.dto";
import { DeleteOperationPictureDto } from "./dto/delete-operation-picture.dto";

@Injectable()
export class OperationPictureService {
  constructor(private prisma: PrismaService) {}

  async createRecord(dto: CreateOperationPictureDto) {
    const lastPic = await this.prisma.operationPicture.findFirst({
      where: { operation_id: dto.operation_id },
      orderBy: { order: "desc" },
    });

    const newOrder = lastPic ? lastPic.order + 1 : 0;

    return this.prisma.operationPicture.create({
      data: {
        operation_id: dto.operation_id,
        file_path_id: dto.file_path_id,
        order: newOrder,
      },
    });
  }
  async deleteRecord(dto: DeleteOperationPictureDto) {
    return this.prisma.operationPicture.delete({
      where: {
        operation_id_file_path_id: {
          operation_id: dto.operation_id,
          file_path_id: dto.file_path_id,
        },
      },
    });
  }

  async getExistingFileIds(id: number) {
    const ids = await this.prisma.operationPicture.findMany({
      where: { operation_id: id },
    });
    const mappedIds = ids.map((i) => i.file_path_id);
    return { existingIds: mappedIds };
  }

  async getPicturesByOperationId(operation_id: number) {
    const pictures = await this.prisma.operationPicture.findMany({
      where: { operation_id: operation_id },
      include: { file_path: true },
    });
    const mappedPictures = pictures.map((picture) => {
      return {
        id: picture.id,
        operation_id: picture.operation_id,
        src: picture.file_path.name,
      };
    });
    return { pictures: mappedPictures };
  }
}
