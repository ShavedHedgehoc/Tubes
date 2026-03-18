import { DEFAULT_PAGE_LIMIT, FileParams, FilesResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";

import { FilesWithPaginationDto } from "./dto/files-with-pagination.dto";
import { FILE_ENDPOINTS } from "./endpoint";

export type GetFilesArgs = FileParams & {
    options?: { isServer: boolean };
};

export async function getFiles({
    options,
    ...params
}: GetFilesArgs): Promise<FilesResponse> {
    const client = options?.isServer ? apiClient : proxyApiClient;
    const res = await client.get<FilesWithPaginationDto>(
        FILE_ENDPOINTS.LIST,
        params,
    );
    return {
        files: res.rows ?? [],
        total: res.total,
        totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
    };
}
