import { type ColumnDef } from "@tanstack/react-table";
import { baseSummaryColumns, type SummaryRow } from "@/entities/summary";


import { PostColumn } from "@/features/post-column";


export const getSummariesColumns = (): ColumnDef<SummaryRow>[] => {
    return [
        ...baseSummaryColumns,

        {
            id: "actions",
            cell: ({ row }) => {
                const summary = row.original;
                return (
                    <div className="text-center">
                        {summary.isActive && <PostColumn
                            row={row.original}

                        />}
                    </div>
                );
            },
        },
    ];
};