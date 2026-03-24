import { UploadFileFormValues } from "@/entities/file";
import {
  Field,
  FieldError,
  FieldLabel,
  FileInputWithIcon,
  Textarea,
} from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";

export function FileField({
  fileInputRef,
  acceptedFiles,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  acceptedFiles: string;
}) {
  const { control } = useFormContext<UploadFileFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-file">Файл изображения</FieldLabel>
          <FileInputWithIcon
            name={name}
            onBlur={onBlur}
            ref={(instance) => {
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
              if (file) {
                onChange(file);
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function DescriptionField() {
  const { control } = useFormContext<UploadFileFormValues>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-description">Описание файла</FieldLabel>
          <Textarea
            {...field}
            id="form-description"
            placeholder="Введите описание..."
            rows={3}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
