"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import {
  createEmployeeFormSchema,
  CreateEmployeeFormValues,
  useEmployeeUiParams,
} from "@/entities/employee";
import { Loader2, X } from "lucide-react";
import { EmployeeEntity } from "@/entities/employee/model/types";
import { RankEntity } from "@/entities/rank";
import { useUpdateEmployee } from "../model";
import { cn } from "@/shared/lib";

export function EditEmployeeForm({
  ranks,
  data,
}: {
  ranks: RankEntity[];
  data: EmployeeEntity;
}) {
  const { params, setParams } = useEmployeeUiParams();
  const { updateEmployee, updatePending } = useUpdateEmployee();
  const expectedValues = ranks.map((item) => item.id);

  const form = useForm<CreateEmployeeFormValues>({
    resolver: zodResolver(createEmployeeFormSchema),
    values: data,
  });

  const updateId = params["edit-employee"];
  async function onSubmit(data: CreateEmployeeFormValues) {
    if (updateId) {
      updateEmployee(
        { id: updateId, ...data },
        {
          onSuccess: () => {
            form.reset();
            setParams({ "edit-employee": null });
          },
        },
      );
    }
  }

  const handleClose = () => {
    form.reset();
    setParams({ "edit-employee": null });
  };

  return (
    <div className="container mx-auto flex  items-center justify-center  flex-col  p-8 flex-1 ">
      <Card className="w-full  max px-3 sm:max-w-md border-0 shadow-none sm:border relative">
        <div className="absolute right-3 top-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Закрыть</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 ">
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Изменение данных сотрудника
              </h3>
            </CardTitle>
            <CardDescription>
              Измените данные и сохраните запись
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="flex flex-col gap-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          ФИО
                        </FieldLabel>
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
                  <Controller
                    name="barcode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-email">
                          Штрихкод
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-email"
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
                  <Controller
                    name="rank_id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-pasword">
                          Разряд
                        </FieldLabel>
                        <Select
                          defaultValue={expectedValues[0].toString()}
                          value={field.value.toString()}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger>
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
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="mt-2">
            <Field
              orientation="horizontal"
              className="justify-end flex flex-row"
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => form.reset()}
              >
                Вернуть
              </Button>
              <Button
                type="submit"
                form="form-rhf-demo"
                disabled={updatePending}
              >
                {updatePending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {updatePending ? "Изменение..." : "Изменить"}
              </Button>
            </Field>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
