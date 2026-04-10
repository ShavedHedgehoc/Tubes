
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { userApi, UserParams } from "@/entities/user";
import UsersView from "./users-view";
import { roleApi } from "@/entities/roles";

export async function Users({ props }: { props: UserParams }) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(
        userApi.userQueries.list(props, { isServer: true }),
    );

    const roleListItems = await queryClient
        .fetchQuery(roleApi.rolesQueries.list({ isServer: true }))
        .catch(() => ({ roles: [] }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UsersView roleListItems={roleListItems.roles ?? []}
            />
        </HydrationBoundary>
    );
}
