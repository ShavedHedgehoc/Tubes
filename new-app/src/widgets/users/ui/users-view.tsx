"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsersColumns } from "./columns";
import { UserIcon } from "@/shared/assets";

import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";

import { useMemo } from "react";
import { useUserSearchParams } from "@/entities/user";
import { userApi, UserEntity, UserParams } from "@/entities/user";
import { RoleEntity } from "@/entities/roles";
import { EditUserModal } from "@/features/user-actions";

export default function UsersView({
  roleListItems,
}: {
  roleListItems: RoleEntity[] | [];
}) {
  const { params, setParams } = useUserSearchParams();
  const { data, isPlaceholderData, isFetching } = useQuery({
    ...userApi.userQueries.list(params, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo(
    () => getUsersColumns({ roles: roleListItems }),
    [roleListItems],
  );

  const dataViewProps: DataViewLayoutProps<UserEntity, UserParams> = {
    title: "Пользователи",
    description: "Список пользователей приложения",
    data: data?.users,
    columns: columns,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    picture: <UserIcon />,
    filter: <></>,
    params: params,
    setParams: setParams,
    isFetching: isFetching || isPlaceholderData,
  };

  return (
    <div>
      <DataViewLayout {...dataViewProps} />
      <EditUserModal />
    </div>
  );
}
