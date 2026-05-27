import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "db";
import { GetProductsListDto } from "./dto/get-products-list.dto";
import { GetProductsListResponse } from "./dto/get-products-list.response";
import { ChangeProductWeightdDto } from "./dto/change-product-weight.dto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      include: {
        unit_weight: {
          orderBy: [{ id: "desc" }],
          take: 1,
        },
      },
    });
    if (!product)
      throw new HttpException("Продукт не найден", HttpStatus.NOT_FOUND);

    const { unit_weight, ...rest } = product;
    return {
      ...rest,
      unit_weight: unit_weight?.[0]?.weight ?? null,
    };
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
          unit_weight: {
            orderBy: [{ id: "desc" }],
            take: 1,
          },
        },
        orderBy: [{ id: "asc" }],
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);
    const mappedProduct = products.map((product) => {
      const { unit_weight, ...rest } = product;
      return {
        ...rest,
        unit_weight: unit_weight?.[0]?.weight ?? null,
      };
    });
    return { total: count, rows: mappedProduct };
  }

  async changeProductWeight(dto: ChangeProductWeightdDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.product_id },
    });
    if (!product)
      throw new HttpException("Продукт не найден", HttpStatus.NOT_FOUND);
    const product_weight = await this.prisma.productUnitWeight.create({
      data: dto,
    });
    return { product_weight };
  }
}
