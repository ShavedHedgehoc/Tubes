"use client";
import { StatusEntity } from "@/entities/status";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TrendingUp, X } from "lucide-react";

import { useHandleOpenChange, usePostChartCardData } from "../model";
import { PostChart } from "./post-chart";

import { format } from "date-fns";
import { formatDuration } from "@/shared/lib";

export function PostChartCard({
  statuses,
  postTitle,
  conveyorName,
  disableClose = false,
}: {
  statuses: StatusEntity[];
  postTitle: string | null;
  conveyorName: string | null;
  disableClose?: boolean;
}) {
  const {
    chartData,
    idleIntervals,
    processedData,
    totalIdleTimes,
    totalTime,
    idlePercent,
    startDate,
    endDate,
  } = usePostChartCardData(statuses);
  const { handleOpenChange } = useHandleOpenChange();
  return (
    <Card className="relative">
      {!disableClose && (
        <div className="absolute right-3 top-3 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted transition-colors "
            onClick={() => handleOpenChange(false)}
          >
            <X className="h-4 w-4 text-foreground" />
            <span className="sr-only">Закрыть</span>
          </Button>
        </div>
      )}
      <CardHeader>
        <CardTitle>График работы поста</CardTitle>
        <CardDescription>
          <div>{`Конвейер: ${conveyorName ?? "-"}`}</div>
          <div>{postTitle ?? "-"}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PostChart
          chartData={chartData}
          idleIntervals={idleIntervals}
          processedData={processedData}
        />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <TrendingUp className="h-4 w-4" /> Последнее значение выпуска:{" "}
          {chartData.length ? (chartData[chartData.length - 1].val ?? 0) : "-"}
        </div>
        <div className="leading-none text-muted-foreground">
          Начало работы: {startDate ? format(startDate, "HH:mm:ss") : "-"}
        </div>
        <div className="leading-none text-muted-foreground">
          Общее время простоя:{" "}
          {totalIdleTimes ? formatDuration(totalIdleTimes) : "-"}{" "}
          {idlePercent !== undefined && `(${idlePercent}%)`}
        </div>
        <div className="leading-none text-muted-foreground">
          Общее время работы: {totalTime ? formatDuration(totalTime) : "-"}
        </div>
        <div className="leading-none text-muted-foreground">
          Конец работы: {endDate ? format(endDate, "HH:mm:ss") : "-"}
        </div>
      </CardFooter>
    </Card>
  );
}
