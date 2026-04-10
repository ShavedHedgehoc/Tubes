import { UserEntity } from "@/entities/user";
import { useUpdateUserRoles } from "./use-update-user-roles";
import { useState } from "react";

export function useCombobox({ user }: { user: UserEntity; }) {
    const { updateUserRoles } = useUpdateUserRoles()

    const [selectedIds, setSelectedIds] = useState<string[]>(
        user.roles?.map(r => r.id.toString()) || []
    );

    const onSelect = (id: string) => {
        const nextIds = selectedIds.includes(id)
            ? selectedIds.filter(itemId => itemId !== id)
            : [...selectedIds, id];
        setSelectedIds(nextIds);
    };

    const reset = () => setSelectedIds(user.roles?.map(r => r.id.toString()) || [])

    const onUpdate = () => {
        const data = {
            id: user.id,
            roles: selectedIds.map(i => Number(i))
        }
        updateUserRoles(data)
    }

    const isChanged = JSON.stringify([...selectedIds].sort()) !==
        JSON.stringify(user.roles?.map(r => r.id.toString()).sort());

    return { updateUserRoles, selectedIds, setSelectedIds, reset, onUpdate, onSelect, isChanged }
}