import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { unlink } from "fs/promises";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) { }
  async uploadFile(file: Express.Multer.File, description?: string) {
    try {
      const savedFile = await this.prisma.filePath.create({
        data: { name: file.filename, path: file.path, description: description || "" },
      });
      return {
        message: "File uploaded successfully",
        data: savedFile,
      };
    } catch (error) {
      if (file.path) await unlink(file.path).catch(() => { });

      throw new HttpException(
        ApiMessages.FILE_NOT_SAVED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async deleteFile(id: number) {
    const fileRecord = await this.prisma.filePath.findUnique({
      where: { id: Number(id) },
    });
    if (!fileRecord) {
      throw new HttpException(ApiMessages.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    try {
      await this.prisma.filePath.delete({
        where: { id: Number(id) },
      });
      await unlink(fileRecord.path).catch(() => { });
      return { message: ApiMessages.FILE_DELETE_SUCCESSFULLY };
    } catch (error) {
      throw new HttpException(
        ApiMessages.FILE_DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
