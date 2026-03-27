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
import { MoreHorizontal, Pencil, Trash, TrendingUp } from "lucide-react";
import { useDeleteSummary } from "../model";
import { useSummaryUiParams } from "@/entities/summary";
import { useRouter } from "next/navigation";

export function RowDropdown({
  id,
  isCanDelete,
}: {
  id: number;
  isCanDelete: boolean;
}) {
  const { setParams } = useSummaryUiParams();
  const { deleteSummary } = useDeleteSummary();
  const router = useRouter();
  const handleDeleteClick = () => deleteSummary(id);
  const handleEditClick = () => setParams({ "edit-summary": id.toString() });
  const handleNavigateToCharts = () => {
    router.push(`/summaries/charts/${id}`);
  };

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
        <DropdownMenuItem
          onClick={handleNavigateToCharts}
          disabled={isCanDelete}
        >
          <TrendingUp />
          График
        </DropdownMenuItem>
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
