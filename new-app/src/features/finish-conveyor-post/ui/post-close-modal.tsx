"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useConveyorUiParams } from "@/entities/conveyor";
import { PostCloseForm } from "./post-close-form";
// import { useEffect } from "react";
// import { toast } from "sonner";

export function PostCloseModal() {
  const { params, setParams } = useConveyorUiParams();
  const { isOpen } = useModalState(params, setParams, "close-post");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setParams({
        "close-post": null,
        "summary-id": null,
        "post-id": null,
        "post-title": null,
      });
    }
  };
  // Role guard from useEffect
  //   useEffect(() => {
  //     if (isOpen && ranks.length === 0) {
  //       toast.error("Список разрядов пуст. Редактирование невозможно.");
  //       onOpenChange(false);
  //       return;
  //     }
  //   }, [ranks.length, isOpen, onOpenChange]);

  return (
    <ModalLayout
      title="Окончание работы поста"
      description="Заполните данные и создайте ззакончите работу поста"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <PostCloseForm />
    </ModalLayout>
  );
}
