import { CreateEmployeeFormValues } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { cn } from "@/shared/lib";
import { Field, FieldError, FieldLabel, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";

export function NameField() {
    const { control } = useFormContext<CreateEmployeeFormValues>();
    return (
        <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-name">ФИО</FieldLabel>
                    <Input
                        {...field}
                        id="form-rhf-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Пожалуйста, введите ФИО"
                        autoComplete="off"
                        className={cn(
                            "ring-0! ring-offset-0! shadow-none!",
                            "outline-none! focus-visible:outline-none!",
                            "focus:border-input focus-visible:border-input",
                        )}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
export function BarcodeField() {
    const { control } = useFormContext<CreateEmployeeFormValues>();
    return (
        <Controller
            name="barcode"
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-barcode">
                        Штрихкод
                    </FieldLabel>
                    <Input
                        {...field}
                        id="form-rhf-barcode"
                        aria-invalid={fieldState.invalid}
                        placeholder="Пожалуйста, введите штрихкод"
                        autoComplete="on"
                        className={cn(
                            "ring-0! ring-offset-0! shadow-none!",
                            "outline-none! focus-visible:outline-none!",
                            "focus:border-input focus-visible:border-input",
                        )}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}

export function RankComboboxField({ ranks, expectedValues }: { ranks: RankEntity[]; expectedValues: number[] }) {
    const { control } = useFormContext<CreateEmployeeFormValues>();
    return (
        <Controller
            name="rank_id"
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-rank">Разряд</FieldLabel>
                    <Select
                        defaultValue={expectedValues[0].toString()}
                        value={field.value.toString()}
                        onValueChange={(val) => field.onChange(Number(val))}
                    >
                        <SelectTrigger
                            id="form-rhf-rank"
                            className={cn(
                                "ring-0! ring-offset-0! shadow-none!",
                                "outline-none! focus-visible:outline-none!",
                                "focus:border-input focus-visible:border-input"
                            )}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background shadow-none">
                            <SelectGroup>
                                {ranks.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id.toString()}
                                    >
                                        {item.description}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            )}
        />
    )
}