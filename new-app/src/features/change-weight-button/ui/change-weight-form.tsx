"use client";

import { ProductEntity } from "@/entities/product";
import { useChangeProductWeightForm } from "../model";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { FormProvider } from "react-hook-form";
import { FormFooter } from "./form-footer";
import { FormHeader } from "./form-header";
import { WeightField } from "./weight-field";

interface Props {
  data: ProductEntity;
}

export function ChangeProductWeightForm({ data }: Props) {
  const { form, onSubmit, handleClose, ...state } = useChangeProductWeightForm({
    data,
  });

  return (
    <FormProvider {...form}>
      <FormLayout
        title="Вес единицы продукта"
        description="Измените данные и сохраните изменения"
        onClose={handleClose}
        footer={<FormFooter createPending={state.updatePending} />}
      >
        <form
          id="change-product-weight-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <FormHeader product={data} />
            <FieldGroup>
              <WeightField />
            </FieldGroup>
          </div>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
