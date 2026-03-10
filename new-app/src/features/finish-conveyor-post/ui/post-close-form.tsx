"use client";

import { FormProvider } from "react-hook-form";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { FormFooter } from "./form-footer";
import { usePostCloseForm } from "../model/use-form";
import { DefectValueField } from "./defect-value-input";

export function PostCloseForm() {
  const { form, onSubmit, handleClose, closePending, title } =
    usePostCloseForm();
  return (
    <FormProvider {...form}>
      <FormLayout
        title={title || "Окончание работы"}
        description="Внесите данные и о браке и закончите работу поста"
        onClose={handleClose}
        footer={<FormFooter createPending={closePending} />}
      >
        <form id="form-rhf-demo" onSubmit={onSubmit}>
          <FieldGroup>
            <div className="flex flex-col gap-4">
              <DefectValueField />
            </div>
          </FieldGroup>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
