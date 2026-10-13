"use client";

import { ModalLayout } from "@/shared/ui";
import { LoaderCard } from "@/shared/ui";
import { useSummaryUiParams } from "@/entities/summary";
import { useModalState } from "@/shared/lib";

export function PendingReportModal() {
  const { params, setParams } = useSummaryUiParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "pending-report",
  );

  return (
    <ModalLayout
      title="Фрмирую отчет"
      description="Дождитесь окончания загрузки"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <LoaderCard message={"Формирую отчет"} />
    </ModalLayout>
  );
}
