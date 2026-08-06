import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { type SummaryRow } from "../model/types";

export const baseSummaryColumns: ColumnDef<SummaryRow>[] = [
    {
        accessorKey: "date",
        header: () => <div className="text-center">Дата</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return (
                <div className="text-center">{format(summary.date, "yyyy-MM-dd")}</div>
            );
        },
    },
    {
        accessorKey: "conveyor",
        header: () => <div className="text-center">Конвейер</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return <div className="text-center">{summary.conveyorName}</div>;
        },
    },
    {
        accessorKey: "shift",
        header: () => <div className="text-center">Смена</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return (
                <div className="text-center">
                    {summary.shift === 1 ? "День" : summary.shift === 2 ? "Ночь" : "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "batch",
        header: () => <div className="text-center">Партия</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return <div className="text-center">{summary.batchName}</div>;
        },
    },
    {
        accessorKey: "code",
        header: () => <div className="text-center">Код 1С</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return <div className="text-center">{summary.productCode}</div>;
        },
    },

    {
        accessorKey: "name",
        header: () => <div className="text-left pl-35">Наименование</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return <div className="text-left">{summary.productName}</div>;
        },
    },
    {
        accessorKey: "plan",
        header: () => <div className="text-center">План</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return <div className="text-center">{summary.plan}</div>;
        },
    },
    {
        accessorKey: "state",
        header: () => <div className="text-center">Статус</div>,
        cell: ({ row }) => {
            const summary = row.original;
            return (
                <div className="text-center">
                    {summary.isFinished
                        ? "Завершено"
                        : summary.isActive
                            ? "В работе"
                            : "-"}
                </div>
            );
        },
    },

];

