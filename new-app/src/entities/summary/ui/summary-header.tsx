"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";

import { SummaryStatusesResponse } from "@/entities/summary";
import { formatNumber } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { SummaryHeaderSkeleton } from "./summary-header-skeleton";

export function SummaryHeader({
  data,
}: {
  data: SummaryStatusesResponse | undefined;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const statusLabel = data?.isActive
    ? "В работе"
    : data?.isFinished
      ? "Завершено"
      : "Не активна";

  if (!data || !isClient) return <SummaryHeaderSkeleton />;

  return (
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
          {data.productCode} {data.productName}
          <span className="ml-4 text-muted-foreground font-normal">
            ({statusLabel})
          </span>
        </h1>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            Партия: <span className="text-foreground">{data.batchName}</span>
          </p>
          <p>
            Дата производства:{" "}
            <span className="text-foreground">
              {format(new Date(data.date), "dd-MM-yyyy")}
            </span>
          </p>
          <p>
            Смена:{" "}
            <span className="text-foreground">
              {data.shift === 1 ? "День" : "Ночь"}
            </span>
          </p>
          <p>
            План:{" "}
            <span className="text-foreground font-medium">
              {formatNumber(data.plan)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
