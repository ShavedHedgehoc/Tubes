"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { SummaryFilter } from "@/features/summary-filter";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { PlantIcon } from "@/shared/assets";
import {
    summaryApi,
    SummaryEntity,
    SummaryParams,
    useSummarySearchParams,
} from "@/entities/summary";
import { UploadButton } from "@/features/summary-upload";
import { EditSummaryModal } from "@/features/summary-actions";

export default function SummariesView() {
    const { params, setParams } = useSummarySearchParams();

    const { data, isPlaceholderData, isFetching } = useQuery({
        ...summaryApi.summaryQueries.list(params, { isServer: false }),
        placeholderData: keepPreviousData,
    });

    const dataViewProps: DataViewLayoutProps<SummaryEntity, SummaryParams> = {
        title: "Сводки",
        description: "Список сводок тубного производства",
        data: data?.summaries,
        columns: columns,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        picture: <PlantIcon />,
        filter: <SummaryFilter actions={<UploadButton />} />,
        params: params,
        setParams: setParams,
        isFetching: isFetching || isPlaceholderData,
    };

    return (
        <div>
            <DataViewLayout {...dataViewProps} />
            <EditSummaryModal />
        </div>
    )
}
