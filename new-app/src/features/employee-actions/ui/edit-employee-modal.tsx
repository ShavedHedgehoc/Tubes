"use client";

import { ModalLayout } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { EditEmployeeForm } from "./edit-employee-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { LoaderCard } from "@/shared/ui";
import { employeeApi, useEmployeeUiParams } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { useModalState } from "@/shared/lib";
import { PostEntity } from "@/entities/post";

export function EditEmployeeModal({
  ranks,
  posts,
}: {
  ranks: RankEntity[];
  posts: PostEntity[];
}) {
  const { params, setParams } = useEmployeeUiParams();
  const {
    data: editId,
    isOpen,
    onOpenChange,
  } = useModalState(params, setParams, "edit-employee");
  const { data, isPending, isError, isSuccess } = useQuery(
    employeeApi.employeeQueries.detail(editId),
  );

  useEffect(() => {
    if (isOpen && ranks.length === 0) {
      toast.error("Список разрядов пуст. Редактирование невозможно.");
      onOpenChange(false);
      return;
    }
    if (isOpen && posts.length === 0) {
      toast.error("Список постов пуст. Редактирование невозможно.");
      onOpenChange(false);
      return;
    }
    if (isSuccess && !data && editId) {
      toast.error("Данные сотрудника не найдены");
      onOpenChange(false);
    }
    if (isError && editId) {
      toast.error("Ошибка при загрузке данных");
      onOpenChange(false);
    }
  }, [
    ranks.length,
    posts.length,
    isSuccess,
    data,
    editId,
    isError,
    onOpenChange,
    isOpen,
  ]);

  return (
    <ModalLayout
      title="Редактирование сотрудника"
      description="Измените данные сотрудника и сохраните изменения"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isPending && editId && <LoaderCard />}
      {data && <EditEmployeeForm ranks={ranks} posts={posts} data={data} />}
    </ModalLayout>
  );
}
