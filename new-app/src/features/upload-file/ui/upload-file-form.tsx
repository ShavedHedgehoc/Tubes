"use client";

import { FieldGroup, FormLayout, LoaderCard } from "@/shared/ui";

import { FormProvider } from "react-hook-form";

import { useFileUploadForm } from "../model";
import { FileField } from "./form-fields";
import { FormFooter } from "./form-footer";

export function UploadFileForm() {
  const { form, uploadPending, handleClose, onSubmit, ...state } =
    useFileUploadForm();

  if (uploadPending) return <LoaderCard />;
  return (
    <FormProvider {...form}>
      <FormLayout
        title="Загрузка файлов"
        description="Выберите файл и загрузите"
        onClose={handleClose}
        footer={
          <FormFooter
            fileInputRef={state.fileInputRef}
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
              />
            </div>
          </FieldGroup>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
