import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ExtrusionParamsView } from "./extrusion-params-view";
import { parameterApi } from "@/entities/parameter";

export async function ExtrusionParams({ id }: { id: string | null }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    parameterApi.paramaterQueries.extrusion_detail(id, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExtrusionParamsView id={id} />
    </HydrationBoundary>
  );
}
