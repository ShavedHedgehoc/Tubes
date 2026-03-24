"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useGalleryUiParams } from "../lib/use-gallery-ui-params";
import { useQuery } from "@tanstack/react-query";
import { fileApi } from "@/entities/file";
import { AddGalleryForm } from "./add-gallery-form";

interface AddGalleryModalProps {
  existingIds: number[];
  onSave: (fileId: number) => void;
}

export function AddGalleryModal({
  existingIds = [],
  onSave,
}: AddGalleryModalProps) {
  const { params, setParams } = useGalleryUiParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "addGalleryOpen",
  );

  const { data, isPending, isSuccess } = useQuery(
    fileApi.fileQueries.list({ limit: 40, page: 1, filename: null }),
  );

  const handleClose = () => {
    setParams({ addGalleryOpen: null });
    setParams({ selectedFileId: null });
  };

  const handleSelect = (id: number | null) => {
    if (id) setParams({ selectedFileId: id });
  };

  const handleConfirm = () => {
    if (params["selectedFileId"]) {
      onSave(params["selectedFileId"]);
    }
    handleClose();
  };

  return (
    <ModalLayout
      title="Добавление файла"
      description="Выберите файл из списка"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="sm:max-w-[95vw] w-full h-full max-h-[95vh] p-4"
    >
      {isPending && <div className="text-center py-10">Загрузка данных...</div>}
      {isSuccess && data.total === 0 && <div>no records</div>}
      {isSuccess && data && data.total > 0 && (
        <AddGalleryForm
          files={data.files}
          onClose={handleClose}
          selectedId={params["selectedFileId"]}
          onSelect={handleSelect}
          onConfirm={handleConfirm}
          alreadyAcceptedIds={existingIds}
        />
      )}
    </ModalLayout>
  );
}
