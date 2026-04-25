import { ColumnDef } from "@tanstack/react-table";
import {
  baseSummaryColumns,
  DEFECT_LIMIT,
  lastSummaryColumns,
  SummaryEntity,
} from "@/entities/summary";
import { RowDropdown } from "@/features/summary-actions";
import { cn } from "@/shared/lib";
import { Informer } from "@/features/product-weight-informer";

export const getSummariesColumns = (): ColumnDef<SummaryEntity>[] => {
  return [
    ...baseSummaryColumns,
    // {
    //   accessorKey: "defectPercent",
    //   header: () => <div className="text-center">Брак</div>,
    //   cell: ({ row }) => {
    //     const summary = row.original;

    //     return (
    //       <div className="text-center">
    //         {summary.unitWeight ? (
    //           <div className={cn("text-center", summary.defectPercent && summary.defectPercent > DEFECT_LIMIT && "text-destructive")}>{summary.defectPercent ?? "-"}</div>
    //         ) : (
    //           <Informer productCode={summary.product.code} />
    //         )}
    //       </div>)
    //   },
    // },
    {
      accessorKey: "defectPercent",
      header: () => <div className="text-center">Брак %</div>,
      cell: ({ row }) => {
        const { defectPercent, unitWeight, product } = row.original;
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

        const isCritical = defectPercent > DEFECT_LIMIT;

        return (
          <div
            className={cn(
              "text-center font-medium",
              isCritical && "text-destructive",
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
