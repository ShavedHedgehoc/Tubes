"use client";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useTresholdUiParams } from "@/entities/treshold";
import { UploadTresholdsForm } from "./upload-tresholds-form";

export function UploadTresholdsModal() {
    const { params, setParams } = useTresholdUiParams();
    const modal = useModalState(params, setParams, "upload-treshold")

    return (
        <ModalLayout
            title="Загрузка границ"
            description=" Выберите файл и загрузите данные"
            {...modal} >
            <UploadTresholdsForm />
        </ModalLayout>
    )
}
