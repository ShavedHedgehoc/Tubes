"use client";
import { summaryApi, SummaryHeader } from "@/entities/summary";
import { PostSpecificationCard } from "@/features/post-specification";
import { cn } from "@/shared/lib";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function SummarySpecificationsView({
  summary_id,
}: {
  summary_id: string | null;
}) {
  const { data } = useQuery({
    ...summaryApi.summaryQueries.specification(
      { summary_id },
      { isServer: false },
    ),
    placeholderData: keepPreviousData,
  });

  const getSpecificationsByPost = (postVal: number) =>
    data?.specifications.filter((s) => s.post?.value === postVal) ?? [];
  return (
    <div
      className={cn(
        "container mx-auto py-10 transition-all duration-500 relative",
      )}
    >
      <SummaryHeader data={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {[1, 2, 3, 4].map((postNum) => (
          <PostSpecificationCard
            key={postNum}
            specifications={getSpecificationsByPost(postNum)}
            postTitle={`Пост №${postNum}`}
            conveyorName={data?.conveyorName ?? ""}
            disableClose={true}
          />
        ))}
      </div>
    </div>
  );
}
