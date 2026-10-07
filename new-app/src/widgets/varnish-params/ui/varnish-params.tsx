import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { VarnishParamsView } from "./varnish-params-view";
import { parameterApi } from "@/entities/parameter";

export async function VarnishParams({ id }: { id: string | null }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    parameterApi.paramaterQueries.varnish_detail(id, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VarnishParamsView id={id} />
    </HydrationBoundary>
  );
}
