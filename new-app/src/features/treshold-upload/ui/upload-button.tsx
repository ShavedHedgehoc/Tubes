"use client";

import { Button } from "@/shared/ui";
import { useTresholdUiParams } from "@/entities/treshold";
import { UploadTresholdsModal } from "./upload-tresholds-modal";

export function UploadButton() {
    const { setParams } = useTresholdUiParams();

    const handleAddClick = () => {
        setParams({ "upload-treshold": true });
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
            <UploadTresholdsModal />
        </div>
    );
}
