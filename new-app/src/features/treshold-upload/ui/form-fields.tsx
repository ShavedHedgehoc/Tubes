import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldLabel,
    FileInputWithIcon,
    FieldError,
} from "@/shared/ui";
import { UploadTresholdsFormValues } from "@/entities/treshold";




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
    const { control } = useFormContext<UploadTresholdsFormValues>();
    return (
        <Controller
            name="file"
            control={control}
            render={({
                field: { onChange, onBlur, name, ref },
                fieldState,
            }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-file">Файл регламента</FieldLabel>
                    <FileInputWithIcon
                        name={name}
                        onBlur={onBlur}
                        ref={(instance) => {
                            ref(instance);
                            if (fileInputRef) {
                                (fileInputRef as React.RefObject<HTMLInputElement | null>).current = instance;
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
