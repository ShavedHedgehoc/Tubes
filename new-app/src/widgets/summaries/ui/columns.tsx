import { ColumnDef } from "@tanstack/react-table";
import { baseSummaryColumns, SummaryEntity } from "@/entities/summary";
import { RowDropdown } from "@/features/summary-actions";

// export const columns: ColumnDef<SummaryEntity>[] = [
//   ...baseSummaryColumns,
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const summary = row.original;
//       return (
//         <div className="text-center">
//           <RowDropdown
//             id={summary.id}
//             isCanDelete={
//               summary._count.extrusion_statuses +
//                 summary._count.varnish_statuses +
//                 summary._count.offset_statuses +
//                 summary._count.sealant_statuses ===
//               0
//             }
//           />
//         </div>
//       );
//     },
//   },
// ];
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
                summary._count.extrusion_statuses +
                  summary._count.varnish_statuses +
                  summary._count.offset_statuses +
                  summary._count.sealant_statuses ===
                0
              }
            />
          </div>
        );
      },
    },
  ];
};
