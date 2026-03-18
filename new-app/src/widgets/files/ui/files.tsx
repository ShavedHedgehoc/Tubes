import { fileApi, FileParams } from "@/entities/file";
import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FilesView from "./files-view";


export async function Files({ props }: { props: FileParams }) {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(
        fileApi.fileQueries.list(props, { isServer: true }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FilesView />
        </HydrationBoundary>
    );
}
