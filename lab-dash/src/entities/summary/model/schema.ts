import { getMonthBounds } from '@/shared/lib';
import {
    type inferParserType,
    parseAsArrayOf,
    // parseAsInteger,
    parseAsIsoDate,
    parseAsString,
} from 'nuqs';

export const summariesParamsSchema = {
    startDate: parseAsString.withDefault(getMonthBounds().start),
    endDate: parseAsString.withDefault(getMonthBounds().end),
    productCode: parseAsString.withDefault(''),
    batchName: parseAsString.withDefault(''),
    conveyors: parseAsArrayOf(parseAsString).withDefault([]),

    // limit: parseAsInteger.withDefault(10),
    // page: parseAsInteger.withDefault(1),
}
export type SummariesParams = inferParserType<typeof summariesParamsSchema>;