import { Button } from "@/shared/ui";
import { ChevronLeft } from "lucide-react";

export function SummaryHeaderSkeleton() {
  return (
    <div className="flex items-center gap-4 mb-8 animate-pulse">
      <Button variant="outline" size="icon" disabled className="shrink-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="space-y-2">
        <div className="h-7 w-64 bg-muted rounded" />
        <div className="h-4 w-40 bg-muted rounded" />
      </div>
    </div>
  );
}
