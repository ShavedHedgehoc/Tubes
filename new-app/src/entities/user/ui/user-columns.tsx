import { ColumnDef } from "@tanstack/react-table";
import { UserEntity } from "../model";
import { UserRolesCell } from "./user-roles-cell";
import { UserNameCell } from "./user-name-cell";
import { UserBannedCell } from "./user-banned-cell";

export const baseUserColumns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left pl-3">Пользователь</div>,
    cell: ({ row }) => <UserNameCell user={row.original} />,
  },
  {
    accessorKey: "email",
    header: () => (
      <span className="hidden sm:block text-left">Электропочта</span>
    ),
    cell: ({ row }) => (
      <span className="hidden sm:block text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },
  {
    header: () => <div className="text-left">Роли</div>,
    id: "roles",
    cell: ({ row: { original: user } }) => <UserRolesCell roles={user.roles} />,
  },
  {
    header: () => <div className="text-center">Доступ</div>,
    id: "banned",
    cell: ({ row }) => <UserBannedCell user={row.original} />,
  },
];
