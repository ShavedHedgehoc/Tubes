import {
  parseAsString,
  parseAsInteger,
  createSearchParamsCache,
  inferParserType,
  parseAsNativeArrayOf,
  parseAsArrayOf,
} from "nuqs/server";

export const operationParamsSchema = {
  value: parseAsString,
  description: parseAsString,
  posts: parseAsNativeArrayOf(parseAsString).withDefault(
    undefined as unknown as string[],
  ),
  min_ranks: parseAsNativeArrayOf(parseAsString).withDefault(
    undefined as unknown as string[],
  ),
  isInactive: parseAsArrayOf(parseAsString),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
};

export type OperationParams = inferParserType<typeof operationParamsSchema>;
export const operationParamsCache = createSearchParamsCache(
  operationParamsSchema,
);
