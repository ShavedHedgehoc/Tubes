import { useSummariesQuery, useSummariesSearchParams, type SummaryRequestParams, type SummaryRow } from "@/entities/summary";
import { useMemo } from "react";
import { getSummariesColumns } from "./columns";
import { DataTable, type DataTableProps } from "@/shared/ui";
import { SummaryFilter } from "@/features/summary-filter";

export function SummariesView() {
    const { params: filters } = useSummariesSearchParams();
    const { data } = useSummariesQuery(filters);
    const columns = useMemo(() => getSummariesColumns(), []);

    const dataTableProps: DataTableProps<SummaryRow, SummaryRequestParams> = {
        columns,
        data: data?.summaries || [],
    }
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
            <p>Список сводок</p>
            <SummaryFilter />
            <DataTable {...dataTableProps} />
        </div>)
}