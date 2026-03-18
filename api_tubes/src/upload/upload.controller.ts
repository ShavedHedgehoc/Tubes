import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Request } from "express";
import { diskStorage } from "multer";

const editFileName = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  //   const name = file.originalname.split(".")[0];
  //   const fileExtName = extname(file.originalname);
  //   const randomName = Array(32)
  //     .fill(null)
  //     .map(() => Math.round(Math.random() * 16))
  //     .join("");
  // You can use just the original name, but adding a timestamp or random string
  // is often safer to prevent overwriting existing files with the same name.
  //   callback(null, `${name}-${randomName}${fileExtName}`);
  callback(null, file.originalname);
};

const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    // If the file extension is not valid, reject the file
    return callback(
      new BadRequestException("Only image files are allowed!"),
      false,
    );
  }
  // Accept the file
  callback(null, true);
};

@Controller("upload")
export class UploadController {
  @Post("file")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/images",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File is missing or invalid");
    }
    return {
      message: "File uploaded successfully",
      filename: file.filename,
      path: file.path,
    };
  }
}
