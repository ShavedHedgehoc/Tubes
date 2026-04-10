"use client";

import { useUserUiParams } from "@/entities/user/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import { Ban, MoreHorizontal, Pencil, RotateCcw, Trash, UserCheck } from "lucide-react";
import { useChangeAccessUser, useResetUserPassword } from "../model";
import { useDeleteUser } from "../model/use-delete-user";


export function RowDropdown({ id, banned }: { id: number; banned: boolean }) {
  const { setParams } = useUserUiParams();
  const { changeAccessUser, changeAccessPending } = useChangeAccessUser();
  const { resetPassword, resetPasswordPending } = useResetUserPassword();
  const { deleteUser, deletePending } = useDeleteUser();
  const handleChangeBannedClick = () => changeAccessUser(id);
  const handleResetClick = () => resetPassword(id);
  const handleDeleteClick = () => deleteUser(id);
  const handleEditClick = () => {
    setParams({ "edit-user": id.toString() });
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
          <DropdownMenuItem onClick={handleResetClick}
            disabled={resetPasswordPending}
          >
            <RotateCcw />
            Сброс пароля
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
