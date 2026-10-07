import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "db";
import { CreateTresholdsBulkDto } from "./dto/create-tresholds-bulk.dto";
import { GetTresholdsDto } from "./dto/get-tresholds.dto";
import {
  TresholdRow,
  GetTresholdsResponse,
} from "./dto/get-tresholds.response";

@Injectable()
export class TresholdsService {
  constructor(private prisma: PrismaService) {}
  //

  // Загрузка всех границ из нового приложения
  async bulkCreateTreholds(dto: CreateTresholdsBulkDto) {
    await this.prisma.$transaction(async (tx) => {
      type TresholdsBatchInput = Prisma.Args<
        typeof tx.treshold,
        "createMany"
      >["data"];

      const uniqueProducts = Array.from(
        new Map(dto.rows.map((i) => [i.code1C, i])).values(),
      );

      await tx.product.createMany({
        data: uniqueProducts.map((p) => ({
          code: p.code1C,
          marking: p.product_marking,
          name: p.product_name,
        })),
        skipDuplicates: true,
      });

      const uniqueConveyorNames = [
        ...new Set(dto.rows.map((i) => i.conveyor_name)),
      ];

      const [conveyors, products] = await Promise.all([
        tx.conveyor.findMany({
          where: { name: { in: uniqueConveyorNames } },
          select: { id: true, name: true },
        }),
        tx.product.findMany({
          where: { code: { in: uniqueProducts.map((p) => p.code1C) } },
          select: { id: true, code: true },
        }),
      ]);

      const convMap = new Map(conveyors.map((p) => [p.name, p.id]));
      const prodMap = new Map(products.map((p) => [p.code, p.id]));

      const tresholdsData: TresholdsBatchInput = dto.rows.map((row) => {
        const conveyorId = convMap.get(row.conveyor_name);
        const productId = prodMap.get(row.code1C);

        if (!conveyorId)
          throw new HttpException(
            `Ковейер с именем "${row.conveyor_name}" не найден`,
            HttpStatus.BAD_REQUEST,
          );
        if (!productId)
          throw new HttpException(
            `Продукт с кодом "${row.code1C}" не найден`,
            HttpStatus.BAD_REQUEST,
          );

        const {
          conveyor_name: _c,
          code1C: _code,
          product_marking: _pm,
          product_name: _pn,
          ...dbFields
        } = row;

        return {
          ...dbFields,
          conveyor_id: conveyorId,
          product_id: productId,
        };
      });
      await tx.treshold.createMany({ data: tresholdsData });
    });
  }

  async getAllTresholds(query: GetTresholdsDto): Promise<GetTresholdsResponse> {
    type TresholdFilter = Prisma.Args<
      typeof this.prisma.treshold,
      "findMany"
    >["where"];
    const { limit, page, code, marking, conveyors } = query;

    const where: TresholdFilter = {
      AND: [
        conveyors?.length ? { conveyor_id: { in: conveyors } } : {},
        code
          ? { product: { code: { contains: code, mode: "insensitive" } } }
          : {},
        marking
          ? { product: { marking: { contains: marking, mode: "insensitive" } } }
          : {},
      ],
    };
    const [total, tresholds] = await Promise.all([
      this.prisma.treshold.count({ where }),
      this.prisma.treshold.findMany({
        where,
        take: Number(limit),
        skip: Number(limit) * (Number(page) - 1),
        include: {
          product: { select: { code: true, name: true, marking: true } },
          conveyor: { select: { name: true } },
        },
        orderBy: [{ id: "desc" }],
      }),
    ]);

    const rows: TresholdRow[] = tresholds.map((item) => ({
      ...item,
      product_code: item.product?.code,
      product_name: item.product?.name,
      product_marking: item.product?.marking,
      conveyor_name: item.conveyor?.name,
      product: undefined,
      conveyor: undefined,
    }));

    return {
      rows: rows,
      total: total,
    };
  }
}
