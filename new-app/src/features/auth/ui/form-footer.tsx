import { Button, Field } from "@/shared/ui";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function FormFooter({
  createPending,
  isRegister,
  toggle,
}: {
  createPending: boolean;
  isRegister: boolean;
  toggle: () => void;
}) {
  const { reset } = useFormContext();
  return (
    <Field orientation="vertical" className="flex flex-col gap-4">
      <Field orientation="horizontal" className="justify-end flex flex-row">
        <Button
          type="button"
          variant="ghost"
          form="form-rhf-demo"
          disabled={createPending}
          onClick={() => reset()}
        >
          Очистить
        </Button>
        <Button type="submit" form="form-rhf-demo" disabled={createPending}>
          {createPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </Button>
      </Field>

      <Field orientation="horizontal" className="justify-end flex flex-row ">
        <p className="text-sm text-muted-foreground">
          {isRegister ? "Уже зарегистрированы? " : "Нет аккаунта? "}
          <span
            onClick={toggle}
            className="text-primary font-bold  cursor-pointer  transition-colors leading-none pb-0.5"
          >
            {isRegister ? "Войти" : "Создать"}
          </span>
        </p>
      </Field>
    </Field>
  );
}
