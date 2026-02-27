import { employeeApi, EmployeeParams } from "@/entities/employee";
import { rankApi } from "@/entities/rank";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeesView from "./employees-view";

export async function Employees({ props }: { props: EmployeeParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    employeeApi.employeeQueries.list(props, { isServer: true }),
  );
  const rankListItems = await queryClient.fetchQuery(
    rankApi.ranksQueries.list({ isServer: true }),
  ).catch(() => ({ ranks: [] }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesView rankListItems={rankListItems.ranks ?? []} />
    </HydrationBoundary>
  );
}
