import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { OffsetParamsView } from "./offset-params-view";
import { parameterApi } from "@/entities/parameter";

export async function OffsetParams({ id }: { id: string | null }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    parameterApi.paramaterQueries.offset_detail(id, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OffsetParamsView id={id} />
    </HydrationBoundary>
  );
}
