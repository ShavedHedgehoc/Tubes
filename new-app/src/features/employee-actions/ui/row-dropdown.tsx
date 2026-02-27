"use client";

import { useEmployeeUiParams } from "@/entities/employee";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import { Ban, MoreHorizontal, Pencil, Trash, UserCheck } from "lucide-react";
import { useChangeAccessEmployee, useDeleteEmployee } from "../model";

export function RowDropdown({ id, banned }: { id: number; banned: boolean }) {
  const { setParams } = useEmployeeUiParams();
  const { changeAccessEmployee, changeAccessPending } =
    useChangeAccessEmployee();
  const { deleteEmployee, deletePending } = useDeleteEmployee();
  const handleChangeBannedClick = () => changeAccessEmployee(id);
  const handleDeleteClick = () => deleteEmployee(id);
  const handleEditClick = () => {
    setParams({ "edit-employee": id.toString() });
  };

  return (
    <div>
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
            onClick={handleChangeBannedClick}
            disabled={changeAccessPending}
          >
            {banned ? <UserCheck /> : <Ban />}
            {banned ? "Разблокировать" : "Заблокировать"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={"destructive"}
            onClick={handleDeleteClick}
            disabled={deletePending}
          >
            <Trash />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
