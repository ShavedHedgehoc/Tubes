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
import {
  List,
  MoreHorizontal,
  Pencil,
  Sheet,
  Trash,
  TrendingUp,
} from "lucide-react";
import { useDeleteSummary } from "../model";
import { summaryApi, useSummaryUiParams } from "@/entities/summary";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { makeXLSX } from "../lib/make-xlsx";
import { useRoles } from "@/entities/user";
// import { useRoles } from "@/features/auth/hooks";

export function RowDropdown({
  id,
  isCanDelete,
  isReportAvailable,
}: {
  id: number;
  isCanDelete: boolean;
  isReportAvailable: boolean;
}) {
  const { isAllowSummaryEdit, isPlanner } = useRoles();
  const { refetch } = useQuery({
    ...summaryApi.summaryQueries.report(id.toString(), { isServer: false }),
    enabled: false,
  });
  const { setParams } = useSummaryUiParams();
  const { deleteSummary } = useDeleteSummary();
  const router = useRouter();
  const handleDeleteClick = () => deleteSummary(id);
  const handleEditClick = () => setParams({ "edit-summary": id.toString() });
  const handleNavigateToCharts = () => {
    router.push(`/summaries/charts/${id}`);
  };

  const handleNavigateToStatuses = () => {
    router.push(`/summaries/statuses/${id}`);
  };

  const handleMakeXLSX = async () => {
    const { data } = await refetch();
    if (data) {
      makeXLSX(data);
    }
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
          onClick={handleMakeXLSX}
          disabled={!isReportAvailable}
        >
          <Sheet />
          XLSX
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleNavigateToCharts}
          disabled={isCanDelete}
        >
          <TrendingUp />
          График
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleNavigateToStatuses}
          disabled={isCanDelete}
        >
          <List />
          Статусы
        </DropdownMenuItem>
        {isAllowSummaryEdit && (
          <DropdownMenuItem onClick={handleEditClick}>
            <Pencil />
            Изменить
          </DropdownMenuItem>
        )}
        {isPlanner && (
          <DropdownMenuItem
            variant={"destructive"}
            onClick={handleDeleteClick}
            disabled={!isCanDelete}
          >
            <Trash />
            Удалить
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
