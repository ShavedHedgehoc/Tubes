import { Trash2 } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

interface DeleteCellProps {
  count: number;
  children: React.ReactNode;
}

export function DeleteCell({ count, children }: DeleteCellProps) {
  if (count <= 0) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="flex items-center justify-center p-2 border rounded-md bg-muted/50 w-16 h-16 overflow-hidden text-destructive opacity-50"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Trash2 />
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        className="w-auto p-2 shadow-xl border-destructive"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-destructive opacity-50 px-1">
            Удаление объектов
          </p>
          <div className="flex flex-wrap gap-2 max-w-[280px]">{children}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
