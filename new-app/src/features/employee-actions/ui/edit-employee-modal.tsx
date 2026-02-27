"use client";

import { Dialog, DialogContent, DialogTitle, ModalLayout } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { EditEmployeeForm } from "./edit-employee-form";
import { toast } from "sonner";
import { useCallback, useEffect } from "react";
import { LoaderCard } from "@/shared/ui";
import { employeeApi, useEmployeeUiParams } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { useModalState } from "@/shared/lib";


export function EditEmployeeModal({ ranks }: { ranks: RankEntity[] }) {

  const { params, setParams } = useEmployeeUiParams()
  const { data: editId, isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "edit-employee"
  );
  const { data, isPending, isError, isSuccess } = useQuery(
    employeeApi.employeeQueries.detail(editId),
  );

  useEffect(() => {
    if (isSuccess && !data && editId) {
      toast.error("Данные сотрудника не найдены");
      onOpenChange(false)
    }
    if (isError && editId) {
      toast.error("Ошибка при загрузке данных");
      onOpenChange(false)
    }
  }, [isSuccess, data, editId, isError, onOpenChange]);

  return (
    <ModalLayout
      title="Редактирование сотрудника"
      description="Измените данные сотрудника и сохраните изменения"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isPending && editId && <LoaderCard />}
      {data && <EditEmployeeForm ranks={ranks} data={data} />}
    </ModalLayout>
  )
}
