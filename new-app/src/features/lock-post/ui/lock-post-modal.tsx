"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useLabLockUIParams } from "../model/use-ui-params";
import { LockPostForm } from "./lock-post-form";

export function LockPostModal() {
  const { params, setParams } = useLabLockUIParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "change-lock",
  );

  return (
    <ModalLayout
      title="Блокировка поста"
      description="Заполните данные и создайте блокировку"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <LockPostForm />
    </ModalLayout>
  );
}
