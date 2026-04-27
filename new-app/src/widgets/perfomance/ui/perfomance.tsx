import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { summaryApi, SummaryCrewsStatsParams } from "@/entities/summary";
import { PerfomanceView } from "./perfomance-view";

export async function Perfomance({
  props,
}: {
  props: SummaryCrewsStatsParams;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    summaryApi.summaryQueries.crewStat(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PerfomanceView />
    </HydrationBoundary>
  );
}
