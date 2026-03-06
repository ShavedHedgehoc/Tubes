"use client";

import { SummaryEntity, useSummaryUiParams } from "@/entities/summary";
import { useEditSummaryForm } from "../model/use-form";
import { FormLayout } from "@/shared/ui";

export function EditSummaryForm({ data }: { data: SummaryEntity }) {
  const { params } = useSummaryUiParams();
  const { form, onSubmit, handleClose } = useEditSummaryForm();

  const editId = params["edit-summary"];

  return (
    <FormLayout
      title="Редактирование сводки"
      description="Измените данные и сохраните изменения"
      onClose={handleClose}
      footer={undefined}
    >
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <p>
          Здесь будет форма редактирования сводки с id = {editId}, когда мы
          придумаем, что редактировать
        </p>
        <p>
          {data.product.code} {data.product.marking} {data.batch.name}
        </p>
      </form>
    </FormLayout>
  );
}
