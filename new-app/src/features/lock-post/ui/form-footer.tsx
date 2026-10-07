import { Button, Field } from "@/shared/ui";
import { Loader2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

export function FormFooter({
  createPending,
  state,
  onClear,
  actionButton,
}: {
  createPending: boolean;
  state: boolean;
  onClear: () => void;
  actionButton: React.ReactNode;
}) {
  const { control } = useFormContext();
  const lockReasonId = useWatch({
    control,
    name: "lockReasonId",
  });
  const isSubmitDisabled = createPending || (state && !lockReasonId);

  return (
    <Field
      orientation="horizontal"
      className={
        state
          ? "justify-between w-full flex flex-row items-center"
          : "justify-end flex flex-row gap-2"
      }
    >
      {state && <div className="flex-1 text-left">{actionButton}</div>}
      {state && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={createPending}
          onClick={onClear}
        >
          Очистить
        </Button>
      )}
      <Button
        type="submit"
        size="sm"
        form="lock-post-form"
        disabled={isSubmitDisabled}
      >
        {createPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {createPending
          ? "Записываю..."
          : state
            ? "Заблокировать"
            : "Разблокировать"}
      </Button>
    </Field>
  );
}
