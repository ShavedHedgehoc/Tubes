"use client";

import { DataViewLayout, DataViewLayoutProps } from "@/shared/ui";
import { ImageIcon } from "@/shared/assets";

import { useMemo } from "react";
import {
    fileApi,
    FileEntity,
    FileParams,
    useFilesSearchParams,
} from "@/entities/file";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilesColumns } from "./columns";
import { FilesFilter } from "@/features/file-filter/ui/files-filter";
import { UploadButton } from "@/features/upload-file";
import { FileViewModal } from "@/features/file-view";

export default function FilesView() {
    const { params, setParams } = useFilesSearchParams();

    const { data, isPlaceholderData, isFetching } = useQuery({
        ...fileApi.fileQueries.list(params, { isServer: false }),
        placeholderData: keepPreviousData,
    });

    const columns = useMemo(() => getFilesColumns(), []);

    const dataViewProps: DataViewLayoutProps<FileEntity, FileParams> = {
        title: "Файлы",
        description: "Список файлов на файловом сервере",
        data: data?.files,
        columns: columns,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        picture: <ImageIcon />,
        filter: <FilesFilter actions={<UploadButton />} />,
        params: params,
        setParams: setParams,
        isFetching: isFetching || isPlaceholderData,
    };

    return (
        <div>
            <DataViewLayout {...dataViewProps} />
            <FileViewModal />
        </div>
    );
}
