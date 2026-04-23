"use client";

import { cn } from "@/shared/lib";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderRowAction?: (row: TData) => React.ReactNode;
}
export function PostTable<TData, TValue>({
  columns,
  data,
  renderRowAction,
}: DataTableProps<TData, TValue>) {
  const finalColumns = useMemo(() => {
    if (!renderRowAction) return columns;

    return [
      ...columns,
      {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => renderRowAction(row.original),
      } as ColumnDef<TData, TValue>,
    ];
  }, [columns, renderRowAction]);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-h-[60vh] overflow-auto rounded-md border relative">
      <Table className="w-full">
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup, groupIndex) => (
            <TableRow key={headerGroup.id} className={cn("border-b-0")}>
              {headerGroup.headers.map((header) => {
                const isGroup = header.column.getLeafColumns().length > 1;
                const isSingle = !header.column.parent && !isGroup;

                if (groupIndex === 1 && isSingle) return null;

                const rowSpan = isSingle && groupIndex === 0 ? 2 : 1;
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    className={cn(
                      "text-center align-middle  bg-muted/20",
                      "h-auto py-2",
                      groupIndex === 0 && isGroup ? "border-b-0" : "border-b",
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Записи не найдены...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
