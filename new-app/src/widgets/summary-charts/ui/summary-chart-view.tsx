"use client";
import { summaryApi } from "@/entities/summary";
import { PostChartCard } from "@/features/post-chart/ui/post-chart-card";
import { cn, formatNumber } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function SummaryChartView({
  summary_id,
}: {
  summary_id: string | null;
}) {
  const router = useRouter();
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
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {data
              ? `${data.productCode} ${data.productName}`
              : "Загрузка данных..."}
          </h1>
          <p className="text-sm text-muted-foreground">
            {data ? `Партия: ${data.batchName}` : "Загрузка данных..."}
          </p>
          <p className="text-sm text-muted-foreground">
            {data
              ? `Дата производства: ${format(data.date, "dd-MM-yyyy")}`
              : "Загрузка данных..."}
          </p>
          <p className="text-sm text-muted-foreground">
            {data
              ? `Смена: ${data.shift === 1 ? "День" : "Ночь"}`
              : "Загрузка данных..."}
          </p>
          <p className="text-sm text-muted-foreground">
            {data ? `План: ${formatNumber(data.plan)}` : "Загрузка данных..."}
          </p>
        </div>
      </div>

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
