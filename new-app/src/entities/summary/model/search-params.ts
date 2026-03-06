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

// export type SummaryUIParams = inferParserType<typeof summaryUiSchema>;
export type SummaryParams = inferParserType<typeof summaryParamsSchema>;
export const summaryParamsCache = createSearchParamsCache(summaryParamsSchema);
