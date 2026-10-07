import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { statusApi, StatusParams } from "@/entities/status";
import StatusView from "./status-view";
import { postApi } from "@/entities/post";

export async function Statuses({ props }: { props: StatusParams }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    statusApi.statusQueries.list(props, { isServer: true }),
  );
  const postListItems = await queryClient
    .fetchQuery(postApi.postsQueries.list({ isServer: true }))
    .catch(() => ({ posts: [] }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatusView
        summary_id={props.summary_id}
        postListItems={postListItems.posts ?? []}
      />
    </HydrationBoundary>
  );
}
