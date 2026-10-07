import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { ModalLayout, LoaderCard } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useConveyorUiParams } from "@/entities/conveyor";
import { summaryApi } from "@/entities/summary";
import { AvailableSummariesView } from "./available-summary-view";

export function AvailableSummariesModal() {
  const { params, setParams } = useConveyorUiParams();
  const { "conveyor-id": conveyorId } = params;
  const { isOpen } = useModalState(params, setParams, "select-available");

  const { data, isLoading, isSuccess } = useQuery({
    ...summaryApi.summaryQueries.available(conveyorId),
    enabled: !!conveyorId && isOpen,
  });

  const handleClose = useCallback(() => {
    setParams({
      "select-available": null,
      "conveyor-id": null,
      "crew-id": null,
    });
  }, [setParams]);

  useEffect(() => {
    if (isSuccess && data?.summaries.length === 0 && isOpen) {
      handleClose();
      toast.error("Нет доступных сводок для данного конвейера");
    }
  }, [isSuccess, data, isOpen, handleClose]);

  return (
    <ModalLayout
      title="Доступные сводки"
      description="Выберите сводку и начните работу конвейера"
      isOpen={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      className="min-w-4xl w-full"
    >
      {isLoading ? (
        <div className="py-10 flex justify-center">
          <LoaderCard />
        </div>
      ) : (
        data && <AvailableSummariesView data={data} />
      )}
    </ModalLayout>
  );
}
