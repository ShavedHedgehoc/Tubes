import { tresholdApi, TresholdParams } from "@/entities/treshold";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import TresholdsView from "./tresholds-view";

type Conveyor = {
  id: number;
  value: string;
};

export async function Tresholds({ props }: { props: TresholdParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    tresholdApi.tresholdQueries.list(props, { isServer: true }),
  );
  const conveyors: Conveyor[] = [
    { id: 1, value: "201" },
    { id: 2, value: "202" },
  ];
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TresholdsView conveyorsListItems={conveyors ?? []} />
    </HydrationBoundary>
  );
}
