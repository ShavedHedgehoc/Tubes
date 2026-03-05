import { baseTresholdColumns, TresholdEntity, tresholdUiSchema } from "@/entities/treshold";
import { ColumnDef } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

export const useTresholdColumns = (): ColumnDef<TresholdEntity>[] => {

    const [activeColumnSet] = useQueryState(
        "treshold-columns",
        tresholdUiSchema["treshold-columns"]
    );
    return useMemo(() => {
        const selectedColumns = baseTresholdColumns[activeColumnSet] || baseTresholdColumns["extrusion"];
        return [
            ...selectedColumns,
            // {
            //     id: "actions",
            //     cell: ({ row }) => {
            //         const summary = row.original;
            //         // Ваша логика RowDropdown здесь
            //         return <div className="text-center">...</div>;
            //     },
            // },
        ];
    }, [activeColumnSet]); // Пересчитываем только при смене набора
};