import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Request } from "express";
import { unlink } from "fs/promises";
import { diskStorage } from "multer";

import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";

const editFileName = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const utf8Name = Buffer.from(file.originalname, 'latin1').toString('utf8');
  const safeName = utf8Name.replace(/\s+/g, '_');
  callback(null, safeName);
};

const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return callback(
      new BadRequestException("Only image files are allowed!"),
      false,
    );
  }
  callback(null, true);
};

@Controller("upload")
export class UploadController {
  constructor(private prisma: PrismaService) { }
  @Post("file")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('RECEIVED FILE:', file);
    if (!file) {
      throw new BadRequestException("File is missing or invalid");
    }
    try {
      const savedFile = await this.prisma.filePath.create({ data: { name: file.filename, path: file.path } })
      return {
        message: "File uploaded successfully",
        data: savedFile
      };
    } catch (error) {
      await unlink(file.path)
      throw new HttpException(ApiMessages.FILE_NOT_SAVED, HttpStatus.BAD_REQUEST)
    }

  }

  @Delete(":id")
  async deleteFile(@Param("id") id: string) {
    const fileRecord = await this.prisma.filePath.findUnique({
      where: { id: Number(id) }
    });

    if (!fileRecord) {
      throw new HttpException(ApiMessages.FILE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    try {
      await this.prisma.filePath.delete({
        where: { id: Number(id) }
      });
      await unlink(fileRecord.path);
      return { message: ApiMessages.FILE_DELETE_SUCCESSFULLY };
    } catch (error) {
      throw new HttpException(ApiMessages.FILE_DELETE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
