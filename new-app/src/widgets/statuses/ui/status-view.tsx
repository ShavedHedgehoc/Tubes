"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getStatusColumns } from "./columns";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { PlantIcon } from "@/shared/assets";
import { useMemo } from "react";
import {
  statusApi,
  StatusParams,
  useStatusSearchParams,
} from "@/entities/status";
import { StatusWithIdsEntity } from "@/entities/status/model/types";
import { StatusFilter } from "@/features/status-filter";
import { PostEntity } from "@/entities/post";

interface StatusViewProps {
  summary_id: string;
  postListItems: PostEntity[];
}

export default function StatusView({
  summary_id,
  postListItems,
}: StatusViewProps) {
  const { params: searchParams, setParams } = useStatusSearchParams();
  const combinedParams = useMemo(
    () => ({
      ...searchParams,
      summary_id: summary_id,
    }),
    [searchParams, summary_id],
  );

  const { data, isPlaceholderData, isFetching } = useQuery({
    ...statusApi.statusQueries.list(combinedParams, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo(() => getStatusColumns(), []);

  const dataViewProps: DataViewLayoutProps<StatusWithIdsEntity, StatusParams> =
    {
      title: "Статусы",
      description: "Список статусов",
      data: data?.statuses,
      columns: columns,
      total: data?.total ?? 0,
      totalPages: data?.totalPages ?? 0,
      picture: <PlantIcon />,
      filter: (
        <StatusFilter
          postListItems={postListItems}
          summaryData={data?.summary ?? null}
        />
      ),
      params: combinedParams,
      setParams: setParams as DataViewLayoutProps<
        StatusWithIdsEntity,
        StatusParams
      >["setParams"],
      isFetching: isFetching || isPlaceholderData,
    };

  return (
    <div>
      <DataViewLayout {...dataViewProps} />
    </div>
  );
}
