"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSummariesColumns } from "./columns";
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
import { useMemo } from "react";
import { CrewEntity } from "@/entities/crew";
import { useRoles } from "@/entities/user";
import { ConveyorEntity } from "@/entities/conveyor";

interface Props {
  conveyorListItems: ConveyorEntity[] | [];
  crewListItems: CrewEntity[] | [];
}

export default function SummariesView({
  crewListItems,
  conveyorListItems,
}: Props) {
  const { params, setParams } = useSummarySearchParams();
  const { isAllowSummaryEdit } = useRoles();

  const { data, isPlaceholderData, isFetching } = useQuery({
    ...summaryApi.summaryQueries.list(params, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo(() => getSummariesColumns(), []);

  const dataViewProps: DataViewLayoutProps<SummaryEntity, SummaryParams> = {
    title: "Сводки",
    description: "Список сводок тубного производства",
    data: data?.summaries,
    columns: columns,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    picture: <PlantIcon />,
    filter: (
      <SummaryFilter
        actions={<UploadButton />}
        conveyorListItems={conveyorListItems}
        crewListItems={crewListItems}
      />
    ),
    params: params,
    setParams: setParams,
    isFetching: isFetching || isPlaceholderData,
  };

  return (
    <div>
      <DataViewLayout {...dataViewProps} />
      {isAllowSummaryEdit && <EditSummaryModal crews={crewListItems} />}
    </div>
  );
}
