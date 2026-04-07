"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ModalLayout } from "@/shared/ui";
import { useModalState } from "@/shared/lib";
import { useGalleryUiParams } from "../lib/use-gallery-ui-params";
import { fileApi } from "@/entities/file";
import { AddGalleryForm } from "./add-gallery-form";

const LIMIT = 64;

interface AddGalleryModalProps {
  existingIds: number[];
  onSave: (fileId: number) => void;
}

export function AddGalleryModal({
  existingIds = [],
  onSave,
}: AddGalleryModalProps) {
  const { params, setParams } = useGalleryUiParams();
  const { isOpen, onOpenChange } = useModalState(
    params,
    setParams,
    "addGalleryOpen",
  );
  const {
    data,
    isPending,
    isSuccess,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      ...fileApi.fileQueries.list({ limit: LIMIT, filename: null, page: 1 })
        .queryKey,
      "infinite",
    ],

    queryFn: ({ pageParam = 1 }) =>
      fileApi.getFiles({
        limit: LIMIT,
        page: pageParam,
        filename: null,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / LIMIT);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
    delay: 500,
    rootMargin: "400px",
    triggerOnce: false,
    skip: isFetching || isFetchingNextPage || isPending,
  });

  const isLockRef = useRef(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isLockRef.current) {
      isLockRef.current = true;

      fetchNextPage().then(() => {
        setTimeout(() => {
          isLockRef.current = false;
        }, 1000);
      });
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const allFiles = useMemo(
    () => data?.pages.flatMap((page) => page.files) ?? [],
    [data],
  );

  const handleClose = () => {
    setParams({ addGalleryOpen: null });
    setParams({ selectedFileId: null });
  };

  const handleSelect = (id: number | null) => {
    if (id) setParams({ selectedFileId: id });
  };

  const handleConfirm = () => {
    if (params["selectedFileId"]) {
      onSave(params["selectedFileId"]);
    }
    handleClose();
  };

  return (
    <ModalLayout
      title="Добавление файла"
      description="Выберите файл из списка"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="sm:max-w-[95vw]  w-full h-full max-h-[95vh] p-4 flex flex-col overflow-hidden "
    >
      {isPending && <div className="text-center py-10">Загрузка данных...</div>}
      {isSuccess && (
        <AddGalleryForm
          files={allFiles}
          onClose={handleClose}
          selectedId={params["selectedFileId"]}
          onSelect={handleSelect}
          onConfirm={handleConfirm}
          alreadyAcceptedIds={existingIds}
          loadMoreRef={ref}
        />
      )}
    </ModalLayout>
  );
}
