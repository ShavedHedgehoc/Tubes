"use server";

import { conveyorApi } from "@/entities/conveyor";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashView from "./dash-view";

export async function Dash() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    conveyorApi.conveyorQueries.view({ isServer: true }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashView />
    </HydrationBoundary>
  );
}
