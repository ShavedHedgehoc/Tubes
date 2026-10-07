import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetProductsListDto } from "./dto/get-products-list.dto";
import { GetProductsListResponse } from "./dto/get-products-list.response";
import { ChangeProductWeightdDto } from "./dto/change-product-weight.dto";

@ApiTags("Номенклатура")
@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiOperation({ summary: "Получить список номенклатуры с параметрами" })
  @Get()
  getAll(
    @Query(new ValidationPipe({ transform: true })) query: GetProductsListDto,
  ): Promise<GetProductsListResponse> {
    return this.productService.getProducts(query);
  }
  @ApiOperation({ summary: "Получить номенклатуру по id" })
  @Get("/:id")
  getConveyorById(@Param("id") id: string) {
    return this.productService.getProductById(Number(id));
  }
  @ApiOperation({ summary: "Обновить вес продукта" })
  @Patch("/weight")
  @UsePipes(new ValidationPipe({ transform: true }))
  updateProductWeight(
    @Body(new ValidationPipe({ transform: true })) dto: ChangeProductWeightdDto,
  ) {
    return this.productService.changeProductWeight(dto);
  }
}
