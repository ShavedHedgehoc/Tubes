"use client";

import { ModalLayout } from "@/shared/ui";
import { useSummaryUiParams } from "@/entities/summary";
import { UploadSummariesForm } from "./upload-summaries-form";
import { useModalState } from "@/shared/lib";

export function UploadSummariesModal() {
  const { params, setParams } = useSummaryUiParams();
  const modal = useModalState(params, setParams, "upload-summary")

  return (
    <ModalLayout
      title="Загрузка сводок"
      description=" Выберите файл, дату и загрузите данные"
      {...modal} >
      <UploadSummariesForm />
    </ModalLayout>
  )
}
