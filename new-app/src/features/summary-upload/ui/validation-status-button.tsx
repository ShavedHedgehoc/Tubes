import { ValError } from "@/entities/summary";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Ban, FileCheck, Loader2 } from "lucide-react";

const MAX_ERRORS_LENGTH = 1000 as const;
export interface ValidationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isValid: boolean;
  isPending: boolean;
  errors: ValError[] | null;
}
export function ValidationStatusButton({
  isValid,
  isPending,
  errors,
  className,
  ...props
}: ValidationButtonProps) {
  const enabledCondition =
    (errors && errors?.length > 0 && errors.length < MAX_ERRORS_LENGTH) ||
    false;
  return (
    <Button
      variant="ghost"
      {...props}
      disabled={!enabledCondition}
      className={cn(
        "w-full justify-start",
        "font-normal text-secondary-foreground",
        "disabled:opacity-100 disabled:text-secondary-foreground",
        "p-0",
        className,
      )}
    >
      <div className="flex w-full">
        {isPending ? (
          <div className="flex flex-row gap-2 w-full items-center justify-left ">
            <Loader2 className="h-8 w-8 animate-spin" />
            Проверяю...
          </div>
        ) : isValid ? (
          <div className="flex flex-row gap-2 w-full items-center justify-left  text-emerald-500">
            <FileCheck className="h-8 w-8" />
            Успешная проверка. Можно загружать.
          </div>
        ) : errors?.length ? (
          <div className="flex flex-row gap-2 w-full items-center justify-left  text-destructive">
            <Ban className="h-8 w-8" />
            {`В файле ${errors.length} ошибок. ${errors.length < MAX_ERRORS_LENGTH ? "Нажмите для просмотра" : "Просмотр не доступен"}`}
          </div>
        ) : (
          ""
        )}
      </div>
    </Button>
  );
}
