"use client";

import { useEmployeeUiParams } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { ModalLayout } from "@/shared/ui";
import { CreateEmployeeForm } from "./create-employee-form";
import { useModalState } from "@/shared/lib";
import { useEffect } from "react";
import { toast } from "sonner";

export function CreateEmployeeModal({ ranks }: { ranks: RankEntity[] }) {
  const { params, setParams } = useEmployeeUiParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "create-employee",
  );

  useEffect(() => {
    if (isOpen && ranks.length === 0) {
      toast.error("Список разрядов пуст. Редактирование невозможно.");
      onOpenChange(false);
      return;
    }
  }, [ranks.length, isOpen, onOpenChange]);

  return (
    <ModalLayout
      title="Создание нового сотрудника"
      description="Заполните данные и создайте запись нового сотрудника"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <CreateEmployeeForm ranks={ranks} />
    </ModalLayout>
  );
}
