import { parseAsString, parseAsInteger, createSearchParamsCache, inferParserType, parseAsBoolean } from "nuqs/server";

export const fileUiSchema = {
    "upload-file": parseAsBoolean.withDefault(false),

};

export const fileParamsSchema = {
    filename: parseAsString,
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
};


export type FileParams = inferParserType<typeof fileParamsSchema>;
export const fileParamsCache =
    createSearchParamsCache(fileParamsSchema);
