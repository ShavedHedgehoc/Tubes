"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductsColumns } from "./columns";
import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { ProductionIcon } from "@/shared/assets";
import { useMemo } from "react";
import {
  productApi,
  ProductParams,
  ProductRow,
  useProductSearchParams,
} from "@/entities/product";
import { ProductFilter } from "@/features/product-filter";
import { AddGalleryModal, PictureViewModal } from "@/features/pictures-column";
import { useCreateProductPictureRecord } from "@/features/product-picture-record-actions";
import { useGalleryUiParams } from "@/features/pictures-column";

export default function ProductsView() {
  const { params, setParams } = useProductSearchParams();
  const { params: galleryUiParams } = useGalleryUiParams();

  const { data, isPlaceholderData, isFetching } = useQuery({
    ...productApi.productQueries.list(params, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  const {
    data: existingIds,
    // isFetching: idsFetching
  } = useQuery({
    ...productApi.productQueries.picture_id_array(
      galleryUiParams["addGalleryEntityId"],
      { isServer: false },
    ),
    enabled: !!galleryUiParams["addGalleryOpen"],
  });

  const { createRecord } = useCreateProductPictureRecord();

  const columns = useMemo(() => getProductsColumns(), []);

  const handleSave = (fileId: number) => {
    if (galleryUiParams["addGalleryEntityId"]) {
      createRecord({
        product_id: galleryUiParams["addGalleryEntityId"],
        file_path_id: fileId,
      });
    }
  };

  const dataViewProps: DataViewLayoutProps<ProductRow, ProductParams> = {
    title: "Продукция",
    description: "Список продукции тубного производства",
    data: data?.products,
    columns: columns,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    picture: <ProductionIcon />,
    filter: <ProductFilter actions={<></>} />,
    params: params,
    setParams: setParams,
    isFetching: isFetching || isPlaceholderData,
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
