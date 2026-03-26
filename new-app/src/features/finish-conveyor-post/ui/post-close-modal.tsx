"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useConveyorUiParams } from "@/entities/conveyor";
import { PostCloseForm } from "./post-close-form";

export function PostCloseModal() {
  const { params, setParams } = useConveyorUiParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "close-post",
  );

  return (
    <ModalLayout
      title="Окончание работы поста"
      description="Заполните данные и создайте закончите работу поста"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PostCloseForm />
    </ModalLayout>
  );
}
