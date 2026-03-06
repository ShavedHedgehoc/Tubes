import { summaryApi, SummaryParams } from "@/entities/summary";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SummariesView from "./summaries-view";

export async function Summaries({ props }: { props: SummaryParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    summaryApi.summaryQueries.list(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummariesView />
    </HydrationBoundary>
  );
}
