import { format } from "date-fns";
import { getMonthBounds } from "@/shared/lib";
import {
  createSearchParamsCache,
  inferParserType,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const summaryUiSchema = {
  "upload-summary": parseAsBoolean.withDefault(false),
  "edit-summary": parseAsString,
  "view-errors": parseAsBoolean.withDefault(false),
};

export const summaryParamsSchema = {
  code: parseAsString,
  start_date: parseAsString.withDefault(
    format(getMonthBounds().firstDay, "yyyy-MM-dd"),
  ),
  end_date: parseAsString.withDefault(
    format(getMonthBounds().lastDay, "yyyy-MM-dd"),
  ),
  conveyors: parseAsArrayOf(parseAsString).withDefault(
    undefined as unknown as string[],
  ),
  states: parseAsArrayOf(parseAsString),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
};

export const summaryDetailParamsSchema = {
  summary_id: parseAsString,
};

export type SummaryParams = inferParserType<typeof summaryParamsSchema>;
export const summaryParamsCache = createSearchParamsCache(summaryParamsSchema);
export type SummaryDetailParams = inferParserType<
  typeof summaryDetailParamsSchema
>;
export const summaryDetailParamsCache = createSearchParamsCache(
  summaryDetailParamsSchema,
);
