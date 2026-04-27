import { CrewEntity } from "@/entities/crew";
import { UpdateSummaryFormValues } from "@/entities/summary";
import { cn } from "@/shared/lib";
import {
  Button,
  ButtonGroup,
  Field,
  FieldError,
  //   FieldError,
  FieldLabel,
  Input,
  //   Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

export function PlanField() {
  const { control } = useFormContext<UpdateSummaryFormValues>();
  return (
    <Controller
      name="plan"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-summary-form-plan">План</FieldLabel>

          <Input
            {...field}
            id="edit-summary-form-plan"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите план"
            autoComplete="off"
            type="number"
            step="1"
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

export function CrewsComboboxField({ crews }: { crews: CrewEntity[] }) {
  const { control } = useFormContext<UpdateSummaryFormValues>();
  return (
    <Controller
      name="crew_id"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-summary-form-crew">Разряд</FieldLabel>
          <ButtonGroup className="flex w-full">
            {field.value && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => field.onChange(null)}
                className="rounded-r-none shrink-0 border-r-0 focus-visible:ring-0"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
            {/* <div className="flex-1 min-w-0 bg-yellow-300"> */}
            <Select
              value={field.value?.toString() ?? "none"}
              onValueChange={(val) => {
                field.onChange(val === "none" ? null : Number(val));
              }}
            >
              <SelectTrigger
                id="edit-summary-form-crew"
                className={cn(
                  "w-full",
                  field.value && "rounded-l-none",
                  "ring-0! ring-offset-0! shadow-none!",
                  "outline-none! focus-visible:outline-none!",
                  "focus:border-input focus-visible:border-input",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background shadow-none ">
                <SelectGroup>
                  <SelectItem value="none">Без бригады</SelectItem>
                  {crews.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* </div> */}
          </ButtonGroup>
        </Field>
      )}
    />
  );
}
