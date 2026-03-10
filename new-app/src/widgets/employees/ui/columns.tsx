import { ColumnDef } from "@tanstack/react-table";
import { baseEmployeeColumns, EmployeeEntity } from "@/entities/employee";
import { RowDropdown } from "@/features/employee-actions";

export const getEmployeesColumns = (): ColumnDef<EmployeeEntity>[] => {
  return [
    ...baseEmployeeColumns,
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="text-center">
            <RowDropdown id={employee.id} banned={employee.banned} />
          </div>
        );
      },
    },
  ];
};
// export const columns: ColumnDef<EmployeeEntity>[] = [
//   ...baseEmployeeColumns,
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const employee = row.original;
//       return (
//         <div className="text-center">
//           <RowDropdown id={employee.id} banned={employee.banned} />
//         </div>
//       );
//     },
//   },
// ];
