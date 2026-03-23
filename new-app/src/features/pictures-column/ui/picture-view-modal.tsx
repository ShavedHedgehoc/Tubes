"use client";

import { Card, ModalLayout, Button } from "@/shared/ui";
import { cn, useModalState } from "@/shared/lib";
import Image from "next/image";

import { useGalleryUiParams } from "../lib/use-gallery-ui-params";
import { X } from "lucide-react";

export function PictureViewModal() {
  const { params, setParams } = useGalleryUiParams();
  const {
    data: filename,
    isOpen,
    onOpenChange,
  } = useModalState(params, setParams, "previewFileName");

  return (
    <ModalLayout
      title="Просмотр файла"
      description="Закройте после просмотра"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="sm:max-w-[95vw] w-full max-h-[95vh] p-4 "
    >
      <Card className="relative">
        <div className="absolute right-3 top-3 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted transition-colors "
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Закрыть</span>
          </Button>
        </div>
        <div
          className={cn(
            "relative w-full",
            "aspect-video min-h-[500px] max-h-[85vh]",
          )}
        >
          {filename && (
            <Image
              src={`/images/${filename}`}
              alt="Full view"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          )}
        </div>
      </Card>
    </ModalLayout>
  );
}
