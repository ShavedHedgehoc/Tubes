import { getParamsRouteByIds, ParamsIds } from "@/entities/parameter";
import { StatusTableRow } from "@/features/post-table/model/types";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function StatusActionButton({ row }: { row: StatusTableRow }) {
    const router = useRouter();
    const route = getParamsRouteByIds(row.ids)
    const isDisabled = !route
    const handleClick = () => {
        if (route && route !== "#") {
            router.push(route);
        }
    }
    return (
        <Button disabled={isDisabled} onClick={handleClick}>Данные {row.id}</Button>
    )
}