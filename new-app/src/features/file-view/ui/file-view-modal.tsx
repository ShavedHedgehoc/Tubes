"use client";

import { ModalLayout } from "@/shared/ui";
import { cn, useModalState } from "@/shared/lib";
import { useFileUiParams } from "@/entities/file";
import Image from "next/image";

export function FileViewModal() {
  const { params, setParams } = useFileUiParams();
  const { data: viewUrl, isOpen } = useModalState(
    params,
    setParams,
    "view-file",
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setParams({
        "view-file": null,
      });
    }
  };

  return (
    <ModalLayout
      title="Просмотр файла"
      description="Закройте после просмотра"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      className="sm:max-w-[95vw] w-full max-h-[95vh] p-4 bg-background/50 shadow-2xl"
    >
      <div
        className={cn(
          "relative w-full",
          "aspect-video min-h-[500px] max-h-[85vh]",
        )}
      >
        {viewUrl && (
          <Image
            src={`/images/${viewUrl}`}
            alt="Full view"
            fill
            unoptimized
            className="object-contain"
            priority
          />
        )}
      </div>
    </ModalLayout>
  );
}
