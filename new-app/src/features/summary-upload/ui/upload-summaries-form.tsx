"use client";

import { FieldGroup, FormLayout, LoaderCard } from "@/shared/ui";
import { ValidationStatusButton } from "./validation-status-button";
import { useSummaryUploadForm } from "../model/use-form";
import { DateField, FileField } from "./form-fields";
import { FormProvider } from "react-hook-form";
import { FormFooter } from "./form-footer";

export function UploadSummariesForm() {
    const {
        form,
        uploadPending,
        handleClose,
        onSubmit,
        validate,
        reset,
        ...state
    } = useSummaryUploadForm();

    if (uploadPending) return <LoaderCard />;
    return (
        <FormProvider {...form}>
            <FormLayout
                title="Загрузка сводок"
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
                            <DateField />
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
