import { ColumnDef } from "@tanstack/react-table";
import {
  baseSummaryColumns,
  lastSummaryColumns,
  SummaryEntity,
} from "@/entities/summary";
import { RowDropdown } from "@/features/summary-actions";
import { cn } from "@/shared/lib";
import { Informer } from "@/features/product-weight-informer";

export const getSummariesColumns = (): ColumnDef<SummaryEntity>[] => {
  return [
    ...baseSummaryColumns,
    {
      accessorKey: "defectPercent",
      header: () => (
        <div className="text-center" style={{ width: "60px" }}>
          Брак %
        </div>
      ),

      cell: ({ row }) => {
        const { defectPercent, unitWeight, product, defectRateGoal } =
          row.original;

        if (!unitWeight) {
          return (
            <div className="flex justify-center">
              <Informer productCode={product.code} />
            </div>
          );
        }

        if (defectPercent === null || defectPercent === undefined) {
          return <div className="text-center text-muted-foreground">-</div>;
        }

        const isCritical =
          defectRateGoal !== null && defectPercent > defectRateGoal;

        return (
          <div
            className={cn(
              "text-center font-medium",
              isCritical && "text-destructive",
              !defectRateGoal && "text-muted-foreground/70",
            )}
          >
            {defectPercent.toFixed(2)}%
          </div>
        );
      },
    },
    ...lastSummaryColumns,
    {
      id: "actions",
      cell: ({ row }) => {
        const summary = row.original;
        return (
          <div className="text-center">
            <RowDropdown
              id={summary.id}
              isCanDelete={
                summary._count.statuses === 0 &&
                !summary.isActive &&
                !summary.isFinished
              }
              isReportAvailable={summary.isFinished}
            />
          </div>
        );
      },
    },
  ];
};
