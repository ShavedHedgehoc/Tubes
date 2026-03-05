import { getQueryClient } from "@/shared/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ExtrusionView from "./extrusion-view";

export async function Extrusion({ slug }: { slug: string }) {
    const queryClient = getQueryClient();

    // Предзагружаем данные, используя slug как ключ
    // await queryClient.prefetchQuery({
    //     queryKey: ["extrusion", slug],
    //     queryFn: () => fetchExtrusionBySlug(slug),
    // });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ExtrusionView slug={slug} />
        </HydrationBoundary>
    );
}
