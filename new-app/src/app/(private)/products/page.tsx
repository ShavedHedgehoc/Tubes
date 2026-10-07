import { productParamsCache } from "@/entities/product";
import { Products } from "@/widgets/products";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await productParamsCache.parse(searchParams);
  return <Products props={params} />;
}
