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
import { useAppSession, userApi } from "@/entities/user";
import { SetupSelector } from "./setup-selector";
import { LabAssistantSelector } from "./lab-assistant-selector";

interface Props {
  row: SummaryAvailable;
}

export default function StartButton({ row }: Props) {
  const session = useAppSession();
  const user = session?.data?.user;
  const { params, setParams } = useConveyorUiParams();
  const { startConveyor, startPending } = useStartConveyor();

  const { data: crewData } = useQuery({
    ...crewApi.crewsQueries.list(),
  });

  const { data: labAssitantData } = useQuery({
    ...userApi.userQueries.labAssistantList(),
  });

  const handleStart = () => {
    const crewIdRaw = params["crew-id"]?.[0];
    const labAssistantIdRaw = params["lab-assistant-id"]?.[0];
    if (crewIdRaw && labAssistantIdRaw && user) {
      const isSetupRaw = params["is-setup"]?.[0] ?? 0;
      const crew_id = Number(crewIdRaw);
      const lab_assistant_id = Number(labAssistantIdRaw);
      startConveyor(
        {
          id: row.id,
          crew_id: crew_id,
          user_id: user.id,
          lab_assistant_id: lab_assistant_id,
          isSetup: Number(isSetupRaw),
        },
        {
          onSuccess: () => {
            setParams({
              "conveyor-id": null,
              "select-available": null,
              "crew-id": null,
              "lab-assistant-id": null,
              "is-setup": null,
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
          className="h-8 gap-1.5 hover:bg-emerald-500 hover:text-white transition-all min-w-25"
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

      <AlertDialogContent className="min-w-200">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <AlertTriangle size={20} />
            <AlertDialogTitle>Подтверждение запуска</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild className="space-y-2 w-full">
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
              <div className="flex flex-col gap-1 pb-2">
                <p className="text-destructive font-medium text-xs">
                  * Внимательно проверьте данные, ВЫБЕРИТЕ БРИГАДУ,
                  ОТВЕТСТВЕТСТВЕННОГО ОТ ОТК и подтвердите.
                </p>
                <p className="text-muted-foreground font-medium text-xs">
                  * Если сводка запускается в режиме перехода - выберите
                  соответствующий режим.
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <SetupSelector />
          <CrewSelector crewItems={crewData?.crews ?? []} />
          <LabAssistantSelector
            labAssitantItems={labAssitantData?.labAssistants ?? []}
          />
          <AlertDialogCancel
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setParams({ "crew-id": null, "lab-assistant-id": null });
            }}
          >
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            size="sm"
            disabled={!params["crew-id"] || !params["lab-assistant-id"]}
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
