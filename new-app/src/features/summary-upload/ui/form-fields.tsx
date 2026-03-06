import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldLabel,
  DatePicker,
  FileInputWithIcon,
  FieldError,
} from "@/shared/ui";
import { UploadSummariesFormValues } from "@/entities/summary";

export function DateField() {
  const { control } = useFormContext<UploadSummariesFormValues>();
  return (
    <Controller
      name="date"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-date">Дата сводки</FieldLabel>
          <DatePicker {...field} id="form-rhf-date" className="w-full" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FileField({
  fileInputRef,
  acceptedFiles,
  validate,
  reset,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  acceptedFiles: string;
  validate: (file: File) => void;
  reset: () => void;
}) {
  const { control } = useFormContext<UploadSummariesFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-file">Файл сводки</FieldLabel>
          <FileInputWithIcon
            name={name}
            onBlur={onBlur}
            ref={(instance) => {
              // Объединяем рефы: от RHF и ваш внешний fileInputRef
              ref(instance);
              if (fileInputRef) {
                (
                  fileInputRef as React.RefObject<HTMLInputElement | null>
                ).current = instance;
              }
            }}
            id="form-rhf-file"
            accept={acceptedFiles}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
              if (file) {
                validate(file);
              } else {
                reset();
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
