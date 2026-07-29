"use client";

import { useConveyorUiParams } from "@/entities/conveyor";
import { useStatusUiParams } from "@/entities/status";
import { cn } from "@/shared/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import { List, SquareMenu, StopCircle, TrendingUp } from "lucide-react";

type IState = "working" | "idle" | "finished" | "locked" | "no_data";
type Props = {
  summaryId: number;
  postId: number;
  postName: string;
  postState: IState;
  conveyorName: string;
};

export function PostDropdown({
  summaryId,
  postId,
  postName,
  postState,
  conveyorName,
}: Props) {
  const { setParams } = useConveyorUiParams();
  const { setParams: setStatusParams } = useStatusUiParams();

  const handleClosePost = () => {
    setParams({
      "summary-id": summaryId,
      "post-val": postId,
      "post-title": postName,
      "close-post": true,
    });
  };

  const handleOpenChart = () => {
    setStatusParams({
      summary_id: summaryId,
      post_val: postId,
      post_title: postName,
      conveyor_name: conveyorName,
      "open-chart": true,
    });
  };

  const handleOpenTable = () => {
    setStatusParams({
      summary_id: summaryId,
      post_val: postId,
      post_title: postName,
      conveyor_name: conveyorName,
      "open-table": true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "p-1.5 rounded-md transition-all outline-none",
            "text-inherit hover:bg-black/10 dark:hover:bg-white/10",
            "ring-0! ring-offset-0! shadow-none!",
            "outline-none! focus-visible:outline-none!",
            "focus:border-input focus-visible:border-input",
          )}
        >
          <SquareMenu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleOpenTable}
          disabled={postState === "no_data"}
        >
          <List />
          <span className="font-semibold"> Статусы</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpenChart}
          disabled={postState === "no_data"}
        >
          <TrendingUp />
          <span className="font-semibold"> График</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant={"destructive"}
          onClick={handleClosePost}
          disabled={
            postState !== "working" &&
            postState !== "idle" &&
            postState !== "locked"
          }
        >
          <StopCircle />
          <span className="font-semibold"> Закончить</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
