import { ColumnDef } from "@tanstack/react-table";
import { baseUserColumns, UserEntity } from "@/entities/user";
import { RoleEntity } from "@/entities/roles";
import { UserRolesCombobox } from "@/features/change-user-role";
import { RowDropdown } from "@/features/user-actions";

export const getUsersColumns = ({
  roles,
}: {
  roles: RoleEntity[];
}): ColumnDef<UserEntity>[] => {
  return [
    ...baseUserColumns,
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2 items-center justify-center">
            <UserRolesCombobox user={row.original} roles={roles} />
            <RowDropdown id={row.original.id} banned={row.original.banned} />
          </div>
        );
      },
    },
  ];
};
