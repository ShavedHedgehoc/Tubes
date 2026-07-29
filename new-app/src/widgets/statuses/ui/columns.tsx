import { ColumnDef } from "@tanstack/react-table";
import { StatusWithIdsEntity } from "@/entities/status/model/types";
import { baseStatusColumns } from "@/entities/status";
import { StatusActionButton } from "@/features/status-actions";
import { StatusTableRow } from "@/features/post-table/model/types";

export const getStatusColumns = (): ColumnDef<StatusWithIdsEntity>[] => {
  return [
    ...baseStatusColumns,
    {
      id: "actions",
      cell: ({ row }) => {
        const status = row.original;
        const mappedRow: StatusTableRow = {
          id: status.id,
          date: status.createdAt,
          employee: status.employee_name,
          state: status.state,
          operation: null,
          ids: status.ids,
          lab_assistant: status.laboratory_assistant_name,
          lab_lock_reason: status.laboratory_lock_reason,
        };

        return (
          <div className="text-center">
            <StatusActionButton row={mappedRow} />
          </div>
        );
      },
    },
  ];
};
