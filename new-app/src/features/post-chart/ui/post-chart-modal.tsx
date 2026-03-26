"use client";

import { LoaderCard, ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { statusApi, useStatusUiParams } from "@/entities/status";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { PostChartCard } from "./post-chart-card";
import { useHandleOpenChange } from "../model";

export function PostChartModal() {
  const { params, setParams } = useStatusUiParams();
  const summary_id = params["summary_id"];
  const post_val = params["post_val"];
  const post_title = params["post_title"];
  const conveyor_name = params["conveyor_name"];
  const { isOpen } = useModalState(params, setParams, "open-chart");
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
      title="График поста"
      description="График поста"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      className="min-w-4xl w-full "
    >
      <div className="flex flex-col h-full max-h-[95vh]">
        {isPending && summary_id && post_val && <LoaderCard />}
        {data && (
          <PostChartCard
            statuses={data.statuses}
            postTitle={post_title}
            conveyorName={conveyor_name}
          />
        )}
      </div>
    </ModalLayout>
  );
}
