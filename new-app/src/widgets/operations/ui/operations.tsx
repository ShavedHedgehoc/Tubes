import { operationApi, OperationParams } from "@/entities/operation";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import OperationsView from "./operations-view";
import { rankApi } from "@/entities/rank";
import { postApi } from "@/entities/post";

export async function Operations({ props }: { props: OperationParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    operationApi.operationQueries.list(props, { isServer: true }),
  );
  const rankListItems = await queryClient
    .fetchQuery(rankApi.ranksQueries.list({ isServer: true }))
    .catch(() => ({ ranks: [] }));
  const postListItems = await queryClient
    .fetchQuery(postApi.postsQueries.list({ isServer: true }))
    .catch(() => ({ posts: [] }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OperationsView
        rankListItems={rankListItems.ranks ?? []}
        postListItems={postListItems.posts ?? []}
      />
    </HydrationBoundary>
  );
}
