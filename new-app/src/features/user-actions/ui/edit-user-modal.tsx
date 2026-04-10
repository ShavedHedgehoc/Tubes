"use client";

import { ModalLayout } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { LoaderCard } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useUserUiParams } from "@/entities/user/lib";
import { userApi } from "@/entities/user";
import { EditUserForm } from "./edit-user-form";

export function EditUserModal() {
    const { params, setParams } = useUserUiParams();
    const {
        data: editId,
        isOpen,
        onOpenChange,
    } = useModalState(params, setParams, "edit-user");

    const { data, isPending, isError, isSuccess } = useQuery(
        userApi.userQueries.detail(editId),
    );

    useEffect(() => {

        if (isSuccess && !data && editId) {
            toast.error("Данные пользователя не найдены");
            onOpenChange(false);
        }
        if (isError && editId) {
            toast.error("Ошибка при загрузке данных");
            onOpenChange(false);
        }
    }, [isSuccess, data, editId, isError, onOpenChange, isOpen]);

    return (
        <ModalLayout
            title="Редактирование пользователя"
            description="Измените данные пользователя и сохраните изменения"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            {isPending && editId && <LoaderCard />}
            {data && <EditUserForm data={data} />}
        </ModalLayout>
    );
}
