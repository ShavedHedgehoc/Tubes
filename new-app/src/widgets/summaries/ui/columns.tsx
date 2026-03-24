import { ColumnDef } from "@tanstack/react-table";
import { baseSummaryColumns, SummaryEntity } from "@/entities/summary";
import { RowDropdown } from "@/features/summary-actions";

export const getSummariesColumns = (): ColumnDef<SummaryEntity>[] => {
  return [
    ...baseSummaryColumns,
    {
      id: "actions",
      cell: ({ row }) => {
        const summary = row.original;
        return (
          <div className="text-center">
            <RowDropdown
              id={summary.id}
              isCanDelete={
                summary._count.statuses === 0 ||
                summary.isActive ||
                summary.isFinished
              }
            />
          </div>
        );
      },
    },
  ];
};
