import { useConveyorUiParams } from "@/entities/conveyor";
import { PlayCircle } from "lucide-react";
import { cn } from "@/shared/lib";

export function AvailableSummariesButton({
  conveyorId,
}: {
  conveyorId: number;
}) {
  const { setParams } = useConveyorUiParams();
  const handleClick = () => {
    setParams({ "conveyor-id": conveyorId, "select-available": true });
  };
  return (
    <div className="absolute top-4 right-3 z-10">
      <button
        onClick={handleClick}
        className={cn(
          "p-2 rounded-xl transition-all duration-200",
          "text-muted-foreground hover:text-foreground",
          "bg-background/80 backdrop-blur-sm hover:bg-background",
          "border shadow-sm active:scale-95",
          "group-hover:border-primary/30",
        )}
        title="Открыть список доступных"
      >
        <PlayCircle className="h-7 w-7" strokeWidth={2.5} />
      </button>
    </div>
  );
}
