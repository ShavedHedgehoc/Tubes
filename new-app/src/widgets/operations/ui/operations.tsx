import { operationApi, OperationParams } from "@/entities/operation";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import OperationsView from "./operations-view";

export async function Operations({ props }: { props: OperationParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    operationApi.operationQueries.list(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OperationsView />
    </HydrationBoundary>
  );
}
