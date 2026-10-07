"use client";
import { summaryApi, SummaryHeader } from "@/entities/summary";
import { PostChartCard } from "@/features/post-chart/ui/post-chart-card";
import { cn } from "@/shared/lib";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function SummaryChartView({
  summary_id,
}: {
  summary_id: string | null;
}) {
  const { data } = useQuery({
    ...summaryApi.summaryQueries.status({ summary_id }, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const getStatusesByPost = (postVal: number) =>
    data?.statuses.filter((s) => s.post_val === postVal) ?? [];
  return (
    <div
      className={cn(
        "container mx-auto py-10 transition-all duration-500 relative",
      )}
    >
      <SummaryHeader data={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {[1, 2, 3, 4].map((postNum) => (
          <PostChartCard
            key={postNum}
            statuses={getStatusesByPost(postNum)}
            postTitle={`Пост №${postNum}`}
            conveyorName={data?.conveyorName ?? ""}
            disableClose={true}
          />
        ))}
      </div>
    </div>
  );
}
