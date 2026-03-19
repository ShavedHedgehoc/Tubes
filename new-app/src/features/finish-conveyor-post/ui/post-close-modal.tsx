"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useConveyorUiParams } from "@/entities/conveyor";
import { PostCloseForm } from "./post-close-form";

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
