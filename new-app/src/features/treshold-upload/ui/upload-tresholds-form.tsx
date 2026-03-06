"use client";

import { FieldGroup, FormLayout, LoaderCard } from "@/shared/ui";
import { FormProvider } from "react-hook-form";

import { useTresholdUploadForm } from "../model";
import { FormFooter } from "./form-footer";
import { FileField } from "./form-fields";
import { ValidationStatusButton } from "./validation-status-button";

export function UploadTresholdsForm() {
  const {
    form,
    uploadPending,
    handleClose,
    onSubmit,
    validate,
    reset,
    ...state
  } = useTresholdUploadForm();

  if (uploadPending) return <LoaderCard />;
  return (
    <FormProvider {...form}>
      <FormLayout
        title="Загрузка границ"
        description="Выберите файл, дату и загрузите данные"
        onClose={handleClose}
        footer={
          <FormFooter
            fileInputRef={state.fileInputRef}
            resetCustom={reset}
            resetDisable={state.resetDisable}
            submitDisable={state.submitDisable}
          />
        }
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-4">
              <FileField
                fileInputRef={state.fileInputRef}
                acceptedFiles={state.acceptedFiles}
                reset={reset}
                validate={validate}
              />
              <ValidationStatusButton
                type="button"
                form="form-rhf-demo"
                isValid={state.isValid}
                isPending={state.isPending}
                errors={state.errors}
              />
            </div>
          </FieldGroup>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
