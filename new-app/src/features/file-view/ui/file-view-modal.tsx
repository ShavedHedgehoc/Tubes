"use client";

import { ModalLayout } from "@/shared/ui";
import { cn, useModalState } from "@/shared/lib";
import { useFileUiParams } from "@/entities/file";
import Image from "next/image";


export function FileViewModal() {
    const { params, setParams } = useFileUiParams();
    const { data: viewUrl, isOpen } = useModalState(params, setParams, "view-file");

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
        >
            <div className={cn("relative w-full",
                // "min-h-[400px]", 
                "h-[80vh]",
                "flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden")}>
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
