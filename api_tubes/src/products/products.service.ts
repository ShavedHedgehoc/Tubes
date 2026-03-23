import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "generated/prisma";
import { GetProductsListDto } from "./dto/get-products-list.dto";
import { GetProductsListResponse } from "./dto/get-products-list.response";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id: id } });
    return product;
  }

  async getProducts(
    query: GetProductsListDto,
  ): Promise<GetProductsListResponse> {
    type ProductWhere = Prisma.Args<
      typeof this.prisma.product,
      "findMany"
    >["where"];
    const where: ProductWhere = {
      AND: [
        { code: { contains: query.code, mode: "insensitive" } },
        { name: { contains: query.name, mode: "insensitive" } },
        { marking: { contains: query.marking, mode: "insensitive" } },
      ],
    };
    const [count, products] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        include: {
          product_pictures: {
            orderBy: [{ order: "asc" }],
            include: { file_path: true },
          },
        },
        orderBy: [{ id: "asc" }],
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);
    return { total: count, rows: products };
  }
}
