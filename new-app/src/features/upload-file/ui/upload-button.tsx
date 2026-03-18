"use client";

import { Button } from "@/shared/ui";
import { UploadFileModal } from "./upload-file-modal";
import { useFileUiParams } from "@/entities/file";


export function UploadButton() {
    const { setParams } = useFileUiParams();

    const handleAddClick = () => {
        setParams({ "upload-file": true });
    };

    return (
        <div>
            <Button
                size="sm"
                variant="default"
                className=" px-3 h-8 min-h-0 "
                onClick={handleAddClick}
            >
                Загрузить
            </Button>
            <UploadFileModal />
        </div>
    );
}
