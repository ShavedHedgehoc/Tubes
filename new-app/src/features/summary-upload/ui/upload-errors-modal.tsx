import { useSummaryUiParams, ValError } from "@/entities/summary";
import { useModalState } from "@/shared/lib";
import { ModalLayout } from "@/shared/ui";
import { UploadErrorsForm } from "./upload-errors-form";


interface UploadErrorsModalProps {
    parserErrors: ValError[] | [];
}

export function UploadErrorsModal({ parserErrors }: UploadErrorsModalProps) {
    const { params, setParams } = useSummaryUiParams();
    const { isOpen, onOpenChange } = useModalState(
        params,
        setParams,
        "view-errors",
    );
    const handleClose = () => {
        setParams({ "view-errors": null });
    }

    return (

        <ModalLayout
            title="Ошибки валидации сводки"
            description="Исправьте файл и загрузите по новой"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="sm:max-w-[900px] w-[95vw] h-[90vh] max-h-[95vh] flex flex-col p-0"
        >
            <UploadErrorsForm errors={parserErrors ?? []} onClose={handleClose} />
        </ModalLayout>
    );
}