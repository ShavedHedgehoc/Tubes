import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

interface PreviewOtherCellProps {
  hiddenCount: number;
  children: React.ReactNode;
}

export function PreviewOtherCell({
  hiddenCount,
  children,
}: PreviewOtherCellProps) {
  if (hiddenCount <= 0) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-md bg-background w-16 h-16 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="text-md font-bold text-foreground">
            +{hiddenCount}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        className="w-auto p-2 shadow-xl border-muted-foreground/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap gap-2 max-w-[300px]">{children}</div>
      </PopoverContent>
    </Popover>
  );
}
