import { ColumnDef } from "@tanstack/react-table";
import {
  baseAvailableSummariesColumns,
  SummaryAvailable,
} from "@/entities/summary";
import StartButton from "./start-button";

export const getConveyorAvailableColumns =
  (): ColumnDef<SummaryAvailable>[] => {
    return [
      ...baseAvailableSummariesColumns,
      {
        id: "actions",
        header: "",
        size: 150,
        minSize: 150,
        maxSize: 150,
        enableResizing: false,
        cell: ({ row }) => <StartButton row={row.original} />,
      },
    ];
  };
