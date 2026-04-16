"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOperationsColumns } from "./columns";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { useMemo } from "react";
import { AddGalleryModal, PictureViewModal } from "@/features/pictures-column";
import { useGalleryUiParams } from "@/features/pictures-column";
import {
  operationApi,
  OperationParams,
  OperationRow,
  useOperationSearchParams,
} from "@/entities/operation";
import { useCreateOperationPictureRecord } from "@/features/operation-picture-record-actions";
import { OperationsIcon } from "@/shared/assets/operations-icon";
import { OperationsFilter } from "@/features/operation-filter";
import { RankEntity } from "@/entities/rank";
import { PostEntity } from "@/entities/post";

export default function OperationsView({
  rankListItems,
  postListItems,
}: {
  rankListItems: RankEntity[] | [];
  postListItems: PostEntity[] | [];
}) {
  const { params, setParams } = useOperationSearchParams();
  const { params: galleryUiParams } = useGalleryUiParams();

  const { data, isPlaceholderData, isFetching } = useQuery({
    ...operationApi.operationQueries.list(params, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const {
    data: existingIds,
    // isFetching: idsFetching
  } = useQuery({
    ...operationApi.operationQueries.picture_id_array(
      galleryUiParams["addGalleryEntityId"],
      { isServer: false },
    ),
    enabled: !!galleryUiParams["addGalleryOpen"],
  });

  const { createRecord } = useCreateOperationPictureRecord();

  const columns = useMemo(() => getOperationsColumns(), []);

  const handleSave = (fileId: number) => {
    if (galleryUiParams["addGalleryEntityId"]) {
      createRecord({
        operation_id: galleryUiParams["addGalleryEntityId"],
        file_path_id: fileId,
      });
    }
  };

  const dataViewProps: DataViewLayoutProps<OperationRow, OperationParams> = {
    title: "Операции",
    description: "Список операций тубного производства",
    data: data?.operations,
    columns: columns,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    picture: <OperationsIcon />,
    filter: (
      <OperationsFilter
        postListItems={postListItems}
        rankListItems={rankListItems}
        actions={<></>}
      />
    ),
    params: params,
    setParams: setParams,
    isFetching: isFetching || isPlaceholderData,
    getRowClassName: (row) => (row.isInactive ? "opacity-50 grayscale" : ""),
  };

  return (
    <div>
      <DataViewLayout {...dataViewProps} />
      <PictureViewModal />
      <AddGalleryModal
        onSave={(fileId) => handleSave(fileId)}
        existingIds={existingIds ?? []}
      />
    </div>
  );
}
