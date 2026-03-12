"use client";

import {
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
import { AlertTriangle, StopCircle } from "lucide-react";
import { ConveyorData } from "@/entities/conveyor";
import { useFinishConveyor } from "../model/use-finish-conveyor";
import { cn } from "@/shared/lib";

export function FinishButton({ conveyorData }: { conveyorData: ConveyorData }) {
  const { finishConveyor, finishPending } = useFinishConveyor();

  const handleFinish = () => {
    if (conveyorData.summary) finishConveyor(conveyorData.summary?.id);
  };

  const disableCondition =
    !conveyorData.summary ||
    conveyorData.summary.extrusion?.postState !== "finished" ||
    conveyorData.summary.varnish?.postState !== "finished" ||
    conveyorData.summary.offset?.postState !== "finished" ||
    conveyorData.summary.sealant?.postState !== "finished";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={disableCondition || finishPending}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            // "p-2 rounded-xl transition-all duration-200",
            // "text-muted-foreground hover:text-foreground",
            // "bg-background/80 backdrop-blur-sm",
            // !disableCondition && "hover:bg-background",
            // "border shadow-sm active:scale-95",
            // "group-hover:border-primary/30",
            // "absolute top-4 right-3 z-10",
            "p-2 rounded-xl transition-all duration-200 border absolute top-4 right-3 z-10",
            "bg-background/80 backdrop-blur-sm",
            !disableCondition
              ? [
                  "text-muted-foreground hover:text-foreground hover:bg-background",
                  "shadow-sm active:scale-95 group-hover:border-primary/30 cursor-pointer",
                ]
              : ["opacity-50 cursor-not-allowed text-muted-foreground/50"],
          )}
          title="Закончить"
        >
          <StopCircle className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <AlertTriangle size={20} />
            <AlertDialogTitle>Подтверждение окончания</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild className="space-y-2">
            <div className="space-y-3 pt-2">
              <p>Вы собираетесь закончить работу конвейера с продуктом:</p>
              <div className="p-3 bg-muted rounded-lg border text-foreground">
                <div className="font-bold">
                  {conveyorData.summary?.product_code}{" "}
                  {conveyorData.summary?.product_name}
                </div>
                <div className="text-xs opacity-70 uppercase">
                  {/* ДАТА: {new Date(conveyorData.summary?.date).toLocaleDateString('ru-RU')} |  */}
                  СМЕНА: {conveyorData.summary?.shift} | ПАРТИЯ:{" "}
                  {conveyorData.summary?.batch_name}
                </div>
              </div>
              <p className="text-destructive font-medium text-xs">
                * Внимательно проверьте данные и подтвердите.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
          >
            Закончить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
