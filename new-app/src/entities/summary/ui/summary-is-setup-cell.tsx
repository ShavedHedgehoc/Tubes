import { Factory, Settings } from "lucide-react";
import { SummaryEntity } from "../model";

export function SummaryIsSetupCell({ summary }: { summary: SummaryEntity }) {
  return (
    <div className="text-center">
      {summary.isSetup ? (
        <span className="flex items-center justify-center text-muted-foreground">
          <Settings className="h-4 w-4" />
        </span>
      ) : (
        <span className="flex justify-center items-center text-muted-foreground">
          <Factory className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
