import { StatusEntity } from "@/entities/status";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TrendingUp, X } from "lucide-react";

import { useHandleOpenChange, usePostTableCardData } from "../model";
import { formatTimeOnly } from "@/shared/lib";
import { PostTable } from "./post-table";
import { useMemo } from "react";
import { statusTableColumns } from "./columns";
import { StatusTableRow } from "../model/types";

export function PostTableCard({
  statuses,
  postTitle,
  conveyorName,
  renderRowAction,
}: {
  statuses: StatusEntity[];
  postTitle: string | null;
  conveyorName: string | null;
  renderRowAction?: (row: StatusTableRow) => React.ReactNode;
}) {
  const { handleOpenChange } = useHandleOpenChange();
  const columns = useMemo(() => {
    return [...statusTableColumns];
  }, []);
  const { data } = usePostTableCardData(statuses);

  return (
    <Card className="relative w-full border-none shadow-none flex flex-col h-full  overflow-hidden max-h-[85vh]">
      <div className="absolute right-3 top-3 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted transition-colors "
          onClick={() => handleOpenChange(false)}
        >
          <X className="h-4 w-4 text-foreground" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>
      <CardHeader className="shrink-0">
        <CardTitle>Список статусов работы поста</CardTitle>
        <CardDescription>
          <div>{`Конвейер: ${conveyorName ?? "-"}`}</div>
          <div>{postTitle ?? "-"}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-4 overflow-hidden flex flex-col">
        {statuses.length > 0 ? (
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
            <PostTable
              data={data}
              columns={columns}
              renderRowAction={(row) => renderRowAction?.(row)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center py-10">
            <span className="font-light text-muted">Данных не найдено</span>
          </div>
        )}
      </CardContent>
      {statuses.length > 0 && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            <TrendingUp className="h-4 w-4" /> Последнее значение выпуска:{" "}
            {statuses[statuses.length - 1].counter_value ?? 0}
          </div>
          <div className="leading-none text-muted-foreground">
            Время последнего внесения параметров:{" "}
            {formatTimeOnly(
              new Date(statuses[statuses.length - 1].createdAt),
            ) ?? "-"}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
