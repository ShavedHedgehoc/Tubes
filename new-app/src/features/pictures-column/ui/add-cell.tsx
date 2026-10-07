import { PlusCircle } from "lucide-react";

export function AddCell({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="flex items-center justify-center p-2 border rounded-md bg-muted/50 w-16 h-16 overflow-hidden text-muted-foreground"
      onClick={onClick}
    >
      <PlusCircle />
    </div>
  );
}
