"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui";
import { Ban, Check, MoreHorizontal } from "lucide-react";
import { useChangeOperationActivity } from "../model";

export function RowDropdown({
  id,
  isInactive,
}: {
  id: number;
  isInactive: boolean;
}) {
  const { changeOperationActivity, changeOperationActivityPending } =
    useChangeOperationActivity();
  const handleChangeBannedClick = () => changeOperationActivity(id);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only"> Open menu </span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleChangeBannedClick}
            disabled={changeOperationActivityPending}
          >
            {isInactive ? <Check /> : <Ban />}
            {isInactive ? "Сделать активной" : "Сделать неактивной"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
