import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SealantParamsView } from "./sealant-params-view";
import { parameterApi } from "@/entities/parameter";

export async function SealantParams({ id }: { id: string | null }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    parameterApi.paramaterQueries.sealant_detail(id, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SealantParamsView id={id} />
    </HydrationBoundary>
  );
}
