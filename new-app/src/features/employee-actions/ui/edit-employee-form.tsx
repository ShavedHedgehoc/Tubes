"use client";

import { FormProvider } from "react-hook-form";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { EmployeeEntity } from "@/entities/employee/model/types";
import { RankEntity } from "@/entities/rank";
import { useEditEmployeeForm } from "../model/use-form";
import { FormFooter } from "./form-footer";
import { BarcodeField, NameField, RankSelector } from "./form-fields";

interface Props {
  ranks: RankEntity[];
  data: EmployeeEntity;
}

export function EditEmployeeForm({ ranks, data }: Props) {
  const { form, onSubmit, handleClose, expectedValues, ...state } =
    useEditEmployeeForm({ data, ranks });

  return (
    <FormProvider {...form}>
      <FormLayout
        title=" Изменение данных сотрудника"
        description="Измените данные и сохраните изменения"
        onClose={handleClose}
        footer={<FormFooter createPending={state.updatePending} />}
      >
        <form id="edit-employee-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FieldGroup>
              <NameField />
              <BarcodeField />
              <RankSelector ranks={ranks} expectedValues={expectedValues} />
            </FieldGroup>
          </div>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
