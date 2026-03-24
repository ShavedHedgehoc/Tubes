"use client";

import { PictureModal } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useFileUiParams } from "@/entities/file";

export function FileViewModal() {
  const { params, setParams } = useFileUiParams();
  const {
    data: filename,
    isOpen,
    onOpenChange,
  } = useModalState(params, setParams, "view-file");

  return (
    <PictureModal
      title={"Просмотр файла"}
      description={"Закройте после просмотра"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      src={filename}
    />
  );
}
