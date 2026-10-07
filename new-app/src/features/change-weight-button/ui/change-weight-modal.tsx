"use client";

import { ModalLayout } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { LoaderCard } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { productApi, useProductUiParams } from "@/entities/product";
import { ChangeProductWeightForm } from "./change-weight-form";

export function ChangeWeightModal() {
  const { params, setParams } = useProductUiParams();
  const {
    data: editId,
    isOpen,
    onOpenChange,
  } = useModalState(params, setParams, "change-product-weight");

  const { data, isPending, isError, isSuccess } = useQuery(
    productApi.productQueries.detail(editId),
  );

  useEffect(() => {
    if (isSuccess && !data && editId) {
      toast.error("Данные продукта не найдены");
      onOpenChange(false);
    }
    if (isError && editId) {
      toast.error("Ошибка при загрузке данных");
      onOpenChange(false);
    }
  }, [isSuccess, data, editId, isError, onOpenChange]);

  return (
    <ModalLayout
      title="Вес единицы продукта"
      description="Введите данные и сохраните изменения"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isPending && editId && <LoaderCard />}
      {data && <ChangeProductWeightForm data={data} />}
    </ModalLayout>
  );
}
