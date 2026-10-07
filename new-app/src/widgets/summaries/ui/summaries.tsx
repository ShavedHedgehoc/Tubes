import { summaryApi, SummaryParams } from "@/entities/summary";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SummariesView from "./summaries-view";
import { crewApi } from "@/entities/crew";
import { conveyorApi } from "@/entities/conveyor";

export async function Summaries({ props }: { props: SummaryParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    summaryApi.summaryQueries.list(props, { isServer: true }),
  );
  const crewListItems = await queryClient
    .fetchQuery(crewApi.crewsQueries.list({ isServer: true }))
    .catch(() => ({ crews: [] }));
  const conveyorListItems = await queryClient
    .fetchQuery(conveyorApi.conveyorQueries.list({ isServer: true }))
    .catch(() => ({ conveyors: [] }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummariesView
        conveyorListItems={conveyorListItems.conveyors ?? []}
        crewListItems={crewListItems.crews ?? []}
      />
    </HydrationBoundary>
  );
}
