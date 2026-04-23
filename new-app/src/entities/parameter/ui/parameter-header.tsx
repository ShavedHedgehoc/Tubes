"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { ParameterSummaryData } from "../model";

interface Props {
  data: ParameterSummaryData | undefined;
  postName: string;
  created: Date | undefined;
  employee: string | undefined;
  onPrev?: () => void;
  onNext?: () => void;
  prev: number | null;
  next: number | null;
}

export function ParameterHeader({
  data,
  postName,
  created,
  employee,
  onPrev,
  onNext,
  prev,
  next,
}: Props) {
  const router = useRouter();

  const statusLabel = data?.isActive
    ? "В работе"
    : data?.isFinished
      ? "Завершено"
      : "Не активна";

  return (
    <div className="flex justify-between items-stretch pb-8 ">
      <div className="flex items-center gap-4 ">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-2xl font-semibold tracking-tight">
            {data?.productCode ?? ""} {data?.productName ?? ""}
            <span className="ml-4 text-muted-foreground font-normal">
              ({statusLabel})
            </span>
          </h1>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Партия:{" "}
              <span className="text-foreground">{data?.batchName ?? ""}</span>
            </p>
            <p>
              Дата производства:{" "}
              <span className="text-foreground">
                {data ? format(new Date(data.date), "dd-MM-yyyy") : ""}
              </span>
            </p>
            <p>
              Смена:{" "}
              <span className="text-foreground">
                {data ? (data.shift === 1 ? "День" : "Ночь") : ""}
              </span>
            </p>
            <p>
              План:{" "}
              <span className="text-foreground font-medium">
                {data ? formatNumber(data.plan) : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex  flex-col items-stretch justify-between">
        <div className="flex flex-col items-end pr-4">
          <span className="">{postName}</span>
          <span className="">
            (
            {`Внесено: ${created ? format(created, "dd-MM-yyyy HH:mm:ss") : "-"}`}
            )
          </span>
          <span className="">{employee ?? "-"}</span>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onPrev} disabled={!prev}>
            <ChevronLeft />
            Предыдущий
          </Button>
          <Button variant="ghost" onClick={onNext} disabled={!next}>
            Следующий
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
