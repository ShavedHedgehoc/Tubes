import { SummaryAvailable, SummuryAvailableResponse } from "@/entities/summary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { getConveyorAvailableColumns } from "./get-avialable-summaries-columns";
import { useMemo } from "react";

interface Props {
  data: SummuryAvailableResponse;
}

export function AvailableSummariesTable({ data }: Props) {
  const tableData = useMemo(() => data.summaries, [data.summaries]);
  const columns = useMemo(() => getConveyorAvailableColumns(), []);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<SummaryAvailable>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="relative">
      <TableHeader className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="hover:bg-transparent border-none"
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                style={{
                  width: header.getSize() !== 150 ? "auto" : header.getSize(),
                }}
                className="text-[10px] uppercase font-black h-11"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="group cursor-pointer hover:bg-muted/40 transition-colors border-b last:border-0"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-3"
                  style={{
                    width:
                      cell.column.getSize() !== 150
                        ? "auto"
                        : cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground italic"
            >
              Доступных сводок не найдено
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
