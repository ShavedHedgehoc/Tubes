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
import { diskStorage } from "multer";
import { ApiMessages } from "src/resources/api-messages";
import { UploadService } from "./upload.service";

const editFileName = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const utf8Name = Buffer.from(file.originalname, 'latin1').toString('utf8');
  const safeName = utf8Name.replace(/\s+/g, '_');
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, `${uniqueSuffix}-${safeName}`);
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
  constructor(private uploadService: UploadService) { }
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
    if (!file) {
      throw new HttpException(ApiMessages.FILE_IS_MISSING_OR_INVALID, HttpStatus.BAD_REQUEST);
    }
    return this.uploadService.uploadFile(file)
  }

  @Delete(":id")
  async deleteFile(@Param("id") id: string) {
    return this.uploadService.deleteFile(Number(id))
  }
}
