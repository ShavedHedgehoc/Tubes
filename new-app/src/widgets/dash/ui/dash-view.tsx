"use client";

import { cn } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";
import { conveyorApi } from "@/entities/conveyor";
import ConveyorCard from "@/entities/conveyor/ui/conveyor-card";
import {
  AvailableSummariesButton,
  AvailableSummariesModal,
} from "@/features/start-conveyor";
import { FinishButton } from "@/features/finish-conveyor";

export default function DashView() {
  const { data, isLoading, isError } = useQuery({
    ...conveyorApi.conveyorQueries.view({ isServer: false }),
    refetchInterval: 10 * 1000,
  });

  if (isError)
    return (
      <div className="p-10 text-center text-destructive">Ошибка загрузки</div>
    );
  if (isLoading)
    return <div className="p-10 text-center animate-pulse">Загрузка...</div>;
  if (data && data.conveyors.length === 0)
    return (
      <div className="p-10 text-center animate-pulse">Данные не найдены...</div>
    );

  return (
    <div className="contents">
      <div className="flex flex-col h-full w-full container mx-auto py-10 px-6 overflow-hidden">
        <div className="mb-8 shrink-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            Мониторинг конвейеров
          </h1>
          <p className="text-sm text-muted-foreground">
            Текущее состояние постов в реальном времени
          </p>
        </div>
        <div className="grow overflow-auto pr-2 scrollbar-thin">
          <div
            className={cn(
              "grid gap-8 w-full items-stretch",
              "grid-cols-1 md:grid-cols-2",
              "auto-rows-fr",
            )}
          >
            {data?.conveyors.map((conveyor) => (
              <ConveyorCard
                key={conveyor.id}
                conveyorData={conveyor}
                menuPermission={true}
                menuActionButton={
                  conveyor.summary ? (
                    <FinishButton conveyorData={conveyor} />
                  ) : (
                    <AvailableSummariesButton conveyorId={conveyor.id} />
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
      <AvailableSummariesModal />
    </div>
  );
}
