import { Controller, useFormContext } from "react-hook-form";
import { LoginFormValues } from "../model/schema";
import { Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import { cn } from "@/shared/lib";

export function NameField() {
  const { control } = useFormContext<LoginFormValues>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-name">ФИО</FieldLabel>
          <Input
            {...field}
            id="login-form-тфьу"
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

export function EmailField() {
  const { control } = useFormContext<LoginFormValues>();
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-name">Электропочта</FieldLabel>
          <Input
            {...field}
            id="login-form-email"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите email"
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

export function PasswordField() {
  const { control } = useFormContext<LoginFormValues>();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-password">Пароль</FieldLabel>
          <Input
            {...field}
            id="login-form-password"
            type="password"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите пароль"
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
