"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { TresholdEntity, TresholdParams, tresholdApi, useTresholdSearchParams } from "@/entities/treshold";

import { TresholdIcon } from "@/shared/assets";
import { TresholdFilter } from "@/features/treshold-filter";
import { UploadButton } from "@/features/treshold-upload";
import { useTresholdColumns } from "../model";


type Conveyor = {
    id: number;
    value: string;
}
export default function TresholdsView({
    conveyorsListItems,
}: {
    conveyorsListItems: Conveyor[] | [];
}) {
    const { params, setParams } = useTresholdSearchParams();
    const columns = useTresholdColumns()

    const { data, isPlaceholderData, isFetching } = useQuery({
        ...tresholdApi.tresholdQueries.list(params, { isServer: false }),
        placeholderData: keepPreviousData,
    });

    const dataViewProps: DataViewLayoutProps<TresholdEntity, TresholdParams> = {
        title: "Границы",
        description: "Список границ",
        data: data?.tresholds,
        columns: columns,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        picture: <TresholdIcon />,
        filter: <TresholdFilter actions={<UploadButton />} conveyorsListItems={conveyorsListItems} />,
        params: params,
        setParams: setParams,
        isFetching: isFetching || isPlaceholderData,
    };

    return (
        <div>
            <DataViewLayout {...dataViewProps} />
        </div>
    )
}
