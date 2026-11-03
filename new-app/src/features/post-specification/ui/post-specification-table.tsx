"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { SpecificationRow } from "@/entities/summary";
import { Minus } from "lucide-react";

export function PostSpecificationTable({
  specifications,
}: {
  specifications: SpecificationRow[];
}) {
  return (
    <div className="relative w-full overflow-auto flex-1">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-25 text-left">Код 1С</TableHead>
            <TableHead className="text-left">Наименование материала</TableHead>
            <TableHead className="w-37.5 text-left">Текущая партия</TableHead>
            <TableHead className="w-25 text-right">Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specifications.map((item) => {
            const hasLot = !!item.currentLot;

            return (
              <TableRow key={item.materialId} className="h-11">
                <TableCell className="font-mono tabular-nums text-sm text-muted-foreground">
                  {item.materialCode1C || <Minus className="h-3 w-3" />}
                </TableCell>

                <TableCell className="font-medium text-sm max-w-75 truncate hover:text-clip hover:whitespace-normal">
                  {item.materialName || <Minus className="h-3 w-3" />}
                </TableCell>

                <TableCell className="text-sm font-mono tabular-nums">
                  {item.currentLot ? (
                    <span className="text-foreground">{item.currentLot}</span>
                  ) : (
                    <span className="text-muted-foreground italic text-xs">
                      Не отсканирована
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      hasLot ? "bg-emerald-500" : "bg-destructive animate-pulse"
                    }`}
                  />
                </TableCell>
              </TableRow>
            );
          })}

          {specifications.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6 text-sm"
              >
                Нет привязанных материалов для этого поста
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
