"use client";

import { PictureModal } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useGalleryUiParams } from "../lib/use-gallery-ui-params";

export function PictureViewModal() {
  const { params, setParams } = useGalleryUiParams();
  const {
    data: filename,
    isOpen,
    onOpenChange,
  } = useModalState(params, setParams, "previewFileName");

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
