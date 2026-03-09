import { PostCloseFormValues } from "@/entities/conveyor";
import { cn } from "@/shared/lib";
import { Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";

export function DefectValueField() {
  const { control } = useFormContext<PostCloseFormValues>();
  return (
    <Controller
      name="defectValue"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-barcode">
            Количество брака, кг
          </FieldLabel>
          <Input
            {...field}
            id="form-rhf-barcode"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите количество"
            autoComplete="off"
            type="number"
            step="0.001"
            onChange={(e) => {
              const val = e.target.value === "" ? 0 : e.target.valueAsNumber;
              field.onChange(val);
            }}
            value={field.value === 0 ? "" : field.value}
            onBlur={(e) => {
              if (e.target.value === "") field.onChange(0);
            }}
            className={cn(
              "ring-0! ring-offset-0! shadow-none!",
              "outline-none! focus-visible:outline-none!",
              "focus:border-input focus-visible:border-input",
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
