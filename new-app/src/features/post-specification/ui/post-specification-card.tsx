"use client";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useHandleOpenChange } from "../model";
import { SpecificationRow } from "@/entities/summary";
import { cn } from "@/shared/lib";
import { PostSpecificationTable } from "./post-specification-table";

export function PostSpecificationCard({
  specifications,
  postTitle,
  conveyorName,
  disableClose = false,
}: {
  specifications: SpecificationRow[];
  postTitle: string | null;
  conveyorName: string | null;
  disableClose?: boolean;
}) {
  const { handleOpenChange } = useHandleOpenChange();
  const isAllScanned = specifications.every((item) => !!item.currentLot);
  return (
    <Card className="relative shadow-none flex flex-col h-full">
      {!disableClose && (
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
      )}
      <CardHeader>
        <CardTitle>{disableClose ? "" : "Комплектующие"}</CardTitle>
        <CardDescription>
          {!disableClose && <div>{`Конвейер: ${conveyorName ?? "-"}`}</div>}
          <div className={cn(disableClose && "font-bold")}>
            {postTitle ?? "-"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex">
          <Badge
            variant={isAllScanned ? "default" : "destructive"}
            className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium"
          >
            {isAllScanned ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Все отсканировано
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Требуется сканирование
              </>
            )}
          </Badge>
        </div>

        <PostSpecificationTable specifications={specifications} />
      </CardContent>
      <CardFooter className="p-0"></CardFooter>
    </Card>
  );
}
