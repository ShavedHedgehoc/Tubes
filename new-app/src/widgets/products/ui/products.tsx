import { productApi, ProductParams } from "@/entities/product";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductsView from "./products-view";

export async function Products({ props }: { props: ProductParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    productApi.productQueries.list(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsView />
    </HydrationBoundary>
  );
}
