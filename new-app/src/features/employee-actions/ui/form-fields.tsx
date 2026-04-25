import { CreateEmployeeFormValues } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { cn } from "@/shared/lib";
import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

import { Controller, useFormContext } from "react-hook-form";

export function NameField() {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-employee-name-input">ФИО</FieldLabel>
          <Input
            {...field}
            id="edit-employee-name-input"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите ФИО"
            autoComplete="off"
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

export function BarcodeField() {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  return (
    <Controller
      name="barcode"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-employee-barcode-input">
            Штрихкод
          </FieldLabel>
          <Input
            {...field}
            id="edit-employee-barcode-input"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите штрихкод"
            autoComplete="on"
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

export function RankSelector({
  ranks,
  expectedValues,
}: {
  ranks: RankEntity[];
  expectedValues: number[];
}) {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  const selectId = "edit-employee-rank-selector";

  return (
    <Controller
      name="rank_id"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={selectId}>Разряд</FieldLabel>
          <Select
            defaultValue={expectedValues[0].toString()}
            value={field.value.toString()}
            onValueChange={(val) => field.onChange(Number(val))}
          >
            <SelectTrigger id={selectId} name={field.name}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background shadow-none">
              <SelectGroup>
                {ranks.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.description}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
