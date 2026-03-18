import { queryOptions } from "@tanstack/react-query";
import { FileParams } from "../model";
import { getFiles } from "./get-files";


export const fileQueries = {
    all: () => ["files"],
    lists: () => [...fileQueries.all(), "list"],
    list: (params: FileParams, options?: { isServer: boolean }) =>
        queryOptions({
            queryKey: [
                ...fileQueries.lists(),
                {
                    ...params,

                    filename: params.filename ?? null,
                },
            ],
            queryFn: () =>
                getFiles({
                    ...params,
                    options,
                }),
            staleTime: 60 * 1000,
        }),

};
