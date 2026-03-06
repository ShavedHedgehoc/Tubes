"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useDeleteSummary } from "../model";
import { useSummaryUiParams } from "@/entities/summary";

export function RowDropdown({
  id,
  isCanDelete,
}: {
  id: number;
  isCanDelete: boolean;
}) {
  const { setParams } = useSummaryUiParams();
  const { deleteSummary } = useDeleteSummary();
  const handleDeleteClick = () => deleteSummary(id);
  const handleEditClick = () => setParams({ "edit-summary": id.toString() });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditClick}>
          <Pencil />
          Изменить
        </DropdownMenuItem>

        <DropdownMenuItem
          variant={"destructive"}
          onClick={handleDeleteClick}
          disabled={!isCanDelete}
        >
          <Trash />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
