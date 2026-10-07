import {
  parseAsInteger,
  parseAsBoolean,
  parseAsString,
  inferParserType,
  createSearchParamsCache,
  parseAsArrayOf,
} from "nuqs/server";

export const statusUiSchema = {
  "open-chart": parseAsBoolean.withDefault(false),
  "open-table": parseAsBoolean.withDefault(false),
  summary_id: parseAsInteger,
  post_val: parseAsInteger,
  conveyor_name: parseAsString,
  post_title: parseAsString,
};

export const statusParamsSchema = {
  posts: parseAsArrayOf(parseAsString).withDefault(
    undefined as unknown as string[],
  ),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
};

export type StatusParams = inferParserType<typeof statusParamsSchema> & {
  summary_id: string;
};
export const statusParamsCache = createSearchParamsCache(statusParamsSchema);
