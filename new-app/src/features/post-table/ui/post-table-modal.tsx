"use client";

import { LoaderCard, ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { statusApi, useStatusUiParams } from "@/entities/status";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { PostTableCard } from "./post-table-card";
import { useHandleOpenChange } from "../model";

export function PostTableModal() {
  const { params, setParams } = useStatusUiParams();
  const summary_id = params["summary_id"];
  const post_val = params["post_val"];
  const post_title = params["post_title"];
  const conveyor_name = params["conveyor_name"];
  const { isOpen } = useModalState(params, setParams, "open-table");
  const { data, isPending, isError, isSuccess } = useQuery(
    statusApi.statusQueries.list({ summary_id, post_val }),
  );

  const { handleOpenChange } = useHandleOpenChange();

  useEffect(() => {
    if (isSuccess && !data && summary_id && post_val) {
      toast.error("Данные не найдены");
      handleOpenChange(false);
    }
    if (isError && summary_id && post_val) {
      toast.error("Ошибка при загрузке данных");
      handleOpenChange(false);
    }
  }, [
    isSuccess,
    data,
    summary_id,
    post_val,
    isError,
    handleOpenChange,
    isOpen,
  ]);

  return (
    <ModalLayout
      title="Таблица статусов"
      description="Таблица статусов"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      className="min-w-4xl w-full "
    >
      {isPending && summary_id && post_val && <LoaderCard />}
      {data && (
        <PostTableCard
          statuses={data.statuses}
          postTitle={post_title}
          conveyorName={conveyor_name}
        />
      )}
    </ModalLayout>
  );
}
