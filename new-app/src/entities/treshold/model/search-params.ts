import { parseAsInteger, parseAsStringLiteral, createSearchParamsCache, inferParserType, parseAsArrayOf, parseAsBoolean, parseAsString } from "nuqs/server";


const columns = ['extrusion', 'varnish', 'offset', 'sealant'] as const;
export const tresholdUiSchema = {
    "upload-treshold": parseAsBoolean.withDefault(false),
    "treshold-columns": parseAsStringLiteral(columns).withDefault('extrusion'),
};

export const tresholdParamsSchema = {
    code: parseAsString,
    marking: parseAsString,
    conveyors: parseAsArrayOf(parseAsString).withDefault(
        undefined as unknown as string[],
    ),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
};

export type TresholdUIParams = inferParserType<typeof tresholdUiSchema>;
export type TresholdParams = inferParserType<typeof tresholdParamsSchema>;
export const tresholdParamsCache = createSearchParamsCache(tresholdParamsSchema);