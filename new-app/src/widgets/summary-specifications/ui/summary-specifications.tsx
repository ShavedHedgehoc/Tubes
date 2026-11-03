import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { summaryApi, SummarySpecificationsParams } from "@/entities/summary";
import { SummarySpecificationsView } from "./summary-specifications-view";

export async function SummarySpecifications({
  props,
}: {
  props: SummarySpecificationsParams;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    summaryApi.summaryQueries.specification(props, { isServer: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummarySpecificationsView summary_id={props.summary_id} />
    </HydrationBoundary>
  );
}
