"use client";

import { useEmployeeUiParams } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { ModalLayout } from "@/shared/ui";
import { CreateEmployeeForm } from "./create-employee-form";
import { useModalState } from "@/shared/lib";

export function CreateEmployeeModal({ ranks }: { ranks: RankEntity[] }) {
  const { params, setParams } = useEmployeeUiParams();
  const modal = useModalState(params, setParams, "create-employee")

  return (
    <ModalLayout
      title="Создание нового сотрудника"
      description="Заполните данные и создайте запись нового сотрудника"
      {...modal}
    >
      <CreateEmployeeForm ranks={ranks} />
    </ModalLayout>
  )
}


