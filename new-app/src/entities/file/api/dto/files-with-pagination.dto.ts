import { FileDto } from "./file.dto";

export type FilesWithPaginationDto = {
  rows: FileDto[];
  total: number;
};
