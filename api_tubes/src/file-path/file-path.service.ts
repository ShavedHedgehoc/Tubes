import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetFilePathsDto } from "./dto/get-file-paths.dto";
import { Prisma } from "@prisma/client";
import { GetFilePathsResponse } from "./dto/get-file-paths.response";

@Injectable()
export class FilePathService {
  constructor(private prisma: PrismaService) {}
  async getFilePaths(query: GetFilePathsDto): Promise<GetFilePathsResponse> {
    type FilePathFilter = Prisma.Args<
      typeof this.prisma.filePath,
      "findMany"
    >["where"];
    const { filename, description, limit, page } = query;
    const where: FilePathFilter = {
      AND: [
        { name: { contains: filename, mode: "insensitive" } },
        { description: { contains: description, mode: "insensitive" } },
      ],
    };
    const [total, rows] = await Promise.all([
      this.prisma.filePath.count({ where }),
      this.prisma.filePath.findMany({
        where,
        take: Number(limit),
        skip: Number(limit) * (Number(page) - 1),
      }),
    ]);
    return {
      total: total,
      rows: rows,
    };
  }
}
