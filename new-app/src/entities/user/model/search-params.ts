import { format } from "date-fns";
import { getMonthBounds } from "@/shared/lib";
import {
    createSearchParamsCache,
    inferParserType,
    parseAsArrayOf,
    parseAsBoolean,
    parseAsInteger,
    parseAsString,
    parseAsStringLiteral,
} from "nuqs/server";

export const userUiSchema = {
    "edit-user": parseAsString,
};

export const userParamsSchema = {
    name: parseAsString,
    email: parseAsString,
    banned: parseAsArrayOf(parseAsString),
    roles: parseAsArrayOf(parseAsString).withDefault(
        undefined as unknown as string[],
    ),
    name_asc: parseAsStringLiteral(["true", "false"] as const).withDefault(
        "true",
    ),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
};

export const userDetailParamsSchema = {
    user_id: parseAsString,
};

export type UserParams = inferParserType<typeof userParamsSchema>;
export const userParamsCache = createSearchParamsCache(userParamsSchema);
export type UserDetailParams = inferParserType<
    typeof userDetailParamsSchema
>;
export const userDetailParamsCache = createSearchParamsCache(
    userDetailParamsSchema,
);
