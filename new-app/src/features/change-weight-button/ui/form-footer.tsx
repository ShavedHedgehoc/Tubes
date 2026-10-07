import { Button, Field } from "@/shared/ui";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function FormFooter({ createPending }: { createPending: boolean }) {
  const { reset } = useFormContext();
  return (
    <Field orientation="horizontal" className="justify-end flex flex-row">
      <Button
        type="button"
        variant="ghost"
        form="change-product-weight-form"
        disabled={createPending}
        onClick={() => reset()}
      >
        Вернуть
      </Button>
      <Button
        type="submit"
        form="change-product-weight-form"
        disabled={createPending}
      >
        {createPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {createPending ? "Запись..." : "Записать"}
      </Button>
    </Field>
  );
}
