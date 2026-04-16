import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetOperationsListDto } from "./dto/get-operations-list.dto";
import { Prisma } from "generated/prisma";

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async getOperationList(query: GetOperationsListDto) {
    type OperationWhere = Prisma.Args<
      typeof this.prisma.operation,
      "findMany"
    >["where"];

    const where: OperationWhere = {
      value: { contains: query.value, mode: "insensitive" },
      description: { contains: query.description, mode: "insensitive" },
      min_rank_id: { in: query.min_ranks },
      post_id: { in: query.posts },
      isInactive:
        query.isInactive?.length === 1
          ? { equals: query.isInactive[0] === 2 }
          : undefined,
    };

    const [count, operations] = await Promise.all([
      this.prisma.operation.count({ where }),
      this.prisma.operation.findMany({
        where,
        include: {
          post: true,
          min_rank: true,
          operation_pictures: {
            include: {
              file_path: true,
            },
          },
        },
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);
    return { total: count, rows: operations };
  }

  // use only in sop pictures page in tubes application
  async getOperationById(operation_id: number) {
    const operations = await this.prisma.operation.findMany({
      where: { id: operation_id },
      include: { min_rank: true },
    });

    const mappedOperation = operations.map((op) => {
      return {
        id: op.id,
        value: op.value,
        description: op.description,
        min_rank: op.min_rank.val,
      };
    });

    return mappedOperation;
  }

  async changeActive(operation_id: number) {
    const operation = await this.prisma.operation.findUnique({
      where: { id: operation_id },
    });
    if (!operation)
      throw new HttpException("Операция не найдена", HttpStatus.NOT_FOUND);
    const updateEmployee = await this.prisma.operation.update({
      where: { id: operation_id },
      data: {
        isInactive: !operation.isInactive,
      },
    });
    return updateEmployee;
  }
}
