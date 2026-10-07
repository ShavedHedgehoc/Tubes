"use client";

import { SummaryDetailEntity } from "@/entities/summary";
import { useEditSummaryForm } from "../model/use-form";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { CrewEntity } from "@/entities/crew";
import { FormProvider } from "react-hook-form";
import { FormFooter } from "./form-footer";
import { CrewsComboboxField, PlanField } from "./form-fields";
import { FormHeader } from "./form-header";

interface Props {
  crews: CrewEntity[];
  data: SummaryDetailEntity;
}

export function EditSummaryForm({ crews, data }: Props) {
  const { form, onSubmit, handleClose, ...state } = useEditSummaryForm({
    data,
    crews,
  });

  return (
    <FormProvider {...form}>
      <FormLayout
        title="Редактирование сводки"
        description="Измените данные и сохраните изменения"
        onClose={handleClose}
        footer={<FormFooter createPending={state.updatePending} />}
      >
        <form id="edit-summary-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormHeader summary={data} />
            <FieldGroup>
              <PlanField />
              <CrewsComboboxField crews={crews} />
            </FieldGroup>
          </div>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
