"use client";

import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { useStartConveyor } from "../model/use-start.conveyor";
import { SummaryAvailable } from "@/entities/summary";
import { useConveyorUiParams } from "@/entities/conveyor";
import { CrewSelector } from "./crew-selector";
import { useQuery } from "@tanstack/react-query";
import { crewApi } from "@/entities/crew";

interface Props {
  row: SummaryAvailable;
}

// const LIST_ITEMS = [
//   { id: 1, name: "Бригада 1" },
//   { id: 2, name: "Бригада 2" },
//   { id: 3, name: "Бригада 3" },
//   { id: 4, name: "Бригада 4" },
//   { id: 5, name: "Бригада 5" },
//   { id: 6, name: "Бригада 6" },
//   { id: 7, name: "Бригада 7" },
//   { id: 8, name: "Бригада 8" },

// ];

export default function StartButton({ row }: Props) {
  const { params, setParams } = useConveyorUiParams();
  const { startConveyor, startPending } = useStartConveyor();

  const { data } = useQuery({
    ...crewApi.crewsQueries.list(),
  });

  const handleStart = () => {
    const crewIdRaw = params["crew-id"]?.[0];
    if (crewIdRaw) {
      const crew_id = Number(crewIdRaw);
      startConveyor(
        { id: row.id, crew_id: crew_id },
        {
          onSuccess: () => {
            setParams({
              "conveyor-id": null,
              "select-available": null,
              "crew-id": null,
            });
          },
        },
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 hover:bg-emerald-500 hover:text-white transition-all min-w-[100px]"
          disabled={startPending}
          onClick={(e) => e.stopPropagation()}
        >
          {startPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <CheckCircle2 size={14} />
          )}
          {startPending ? "Запуск..." : "Запустить"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <AlertTriangle size={20} />
            <AlertDialogTitle>Подтверждение запуска</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild className="space-y-2">
            <div className="space-y-3 pt-2">
              <p>Вы собираетесь запустить конвейер с продуктом:</p>
              <div className="p-3 bg-muted rounded-lg border text-foreground">
                <div className="font-bold">
                  {row.product.code} {row.product.name}
                </div>
                <div className="text-xs opacity-70 uppercase">
                  ДАТА: {new Date(row.date).toLocaleDateString("ru-RU")} |
                  СМЕНА:{" "}
                  {row.shift === 1 ? "День" : row.shift === 2 ? "Ночь" : "-"} |
                  ПАРТИЯ: {row.batch.name}
                </div>
              </div>
              <p className="text-destructive font-medium text-xs">
                * Внимательно проверьте данные, ВЫБЕРИТЕ БРИГАДУ и подтвердите.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CrewSelector crewItems={data?.crews ?? []} />
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
              setParams({ "crew-id": null });
            }}
          >
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!params["crew-id"]}
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
          >
            Запустить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
