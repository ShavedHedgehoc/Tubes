import { StatusTableRow } from "@/features/post-table/model/types";
import { cn, getRouteByStatusIds } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export function StatusActionButton({ row }: { row: StatusTableRow }) {
  const router = useRouter();
  const route = getRouteByStatusIds(row.ids);
  const isDisabled = !route;
  const handleClick = () => {
    if (route && route !== "#") {
      router.push(route);
    }
  };
  return (
    <Button
      variant="ghost"
      className={cn("h-8 w-8 p-0", !route && "invisible")}
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={`Открыть данные записи ${row.id}`}
    >
      <Info className="h-4 w-4" />
    </Button>
  );
}
