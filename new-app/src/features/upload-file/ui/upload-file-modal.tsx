"use client";
import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useFileUiParams } from "@/entities/file";
import { UploadFileForm } from "./upload-file-form";

export function UploadFileModal() {
  const { params, setParams } = useFileUiParams();
  const modal = useModalState(params, setParams, "upload-file");

  return (
    <ModalLayout
      title="Загрузка файла"
      description=" Выберите файл и загрузите"
      {...modal}
    >
      <UploadFileForm />
    </ModalLayout>
  );
}
