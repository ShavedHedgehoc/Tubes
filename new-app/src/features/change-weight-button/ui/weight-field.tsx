import { ChangeProductWeightFormValues } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";

export function WeightField() {
  const { control } = useFormContext<ChangeProductWeightFormValues>();
  return (
    <Controller
      name="weight"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="change-product-weight-form-weight">
            Вес единицы продукта, кг
          </FieldLabel>
          <Input
            {...field}
            id="change-product-weight-form-weight"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите вес в кг"
            autoComplete="off"
            type="number"
            step="0.0001"
            value={field.value ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(val === "" ? "" : Number(val));
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
