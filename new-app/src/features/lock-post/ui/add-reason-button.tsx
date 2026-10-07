import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";

interface AddReasonButtonProps {
  onClick: () => void;
}

export function AddReasonButton({ onClick }: AddReasonButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-1"
      onClick={onClick}
    >
      <Plus className="h-3.5 w-3.5" />
      Добавить
    </Button>
  );
}
