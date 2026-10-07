import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { summaryApi, SummaryDetailParams } from "@/entities/summary";
import { SummaryChartView } from "./summary-chart-view";

export async function SummaryCharts({ props }: { props: SummaryDetailParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    summaryApi.summaryQueries.status(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummaryChartView summary_id={props.summary_id} />
    </HydrationBoundary>
  );
}
