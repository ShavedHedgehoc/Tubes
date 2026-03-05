"use client";

import { ModalLayout } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { LoaderCard } from "@/shared/ui";
import { summaryApi, useSummaryUiParams } from "@/entities/summary";
import { useModalState } from "@/shared/lib";
import { EditSummaryForm } from "./edit-summary-form";

export function EditSummaryModal() {

  const { params, setParams } = useSummaryUiParams();
  const { data: editId, isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "edit-summary"
  );
  const { data, isPending, isError, isSuccess } = useQuery(
    summaryApi.summaryQueries.detail(editId),
  );

  useEffect(() => {
    if (isSuccess && !data && editId) {
      toast.error("Данные сводки не найдены");
      onOpenChange(false)
    }
    if (isError && editId) {
      toast.error("Ошибка при загрузке данных");

      onOpenChange(false)
    }
  }, [isSuccess, data, editId, isError, onOpenChange]);

  return (
    <ModalLayout
      title="Редактирование сводки"
      description="Измените данные сотрудника и сохраните изменения"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isPending && editId && <LoaderCard />}
      {data && <EditSummaryForm data={data} />}
    </ModalLayout>

  );
}
