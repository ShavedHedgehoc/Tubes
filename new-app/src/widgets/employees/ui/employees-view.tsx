"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployeesColumns } from "./columns";
import { EmployeeIcon } from "@/shared/assets";
import { RankEntity } from "@/entities/rank";
import {
  employeeApi,
  EmployeeEntity,
  EmployeeParams,
  useEmployeeSearchParams,
} from "@/entities/employee";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { EditEmployeeModal } from "@/features/employee-actions";
import { AddButton, CreateEmployeeModal } from "@/features/employee-create";
import { EmployeesFilter } from "@/features/employee-filter";
import { useMemo } from "react";

export default function EmployeesView({
  rankListItems,
}: {
  rankListItems: RankEntity[] | [];
}) {
  const { params, setParams } = useEmployeeSearchParams();
  const { data, isPlaceholderData, isFetching } = useQuery({
    ...employeeApi.employeeQueries.list(params, { isServer: false }),

    placeholderData: keepPreviousData,
  });

  const columns = useMemo(() => getEmployeesColumns(), []);

  const dataViewProps: DataViewLayoutProps<EmployeeEntity, EmployeeParams> = {
    title: "Сотрудники",
    description: "Список сотрудников тубного производства",
    data: data?.employees,
    columns: columns,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    picture: <EmployeeIcon />,
    filter: (
      <EmployeesFilter rankListItems={rankListItems} actions={<AddButton />} />
    ),
    params: params,
    setParams: setParams,
    isFetching: isFetching || isPlaceholderData,
  };

  return (
    <div>
      <DataViewLayout {...dataViewProps} />
      <EditEmployeeModal ranks={rankListItems} />
      <CreateEmployeeModal ranks={rankListItems} />
    </div>
  );
}
