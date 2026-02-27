import {
  parseAsString,
  parseAsInteger,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsStringLiteral,
  inferParserType,
  parseAsBoolean,
} from "nuqs/server";

export const employeeUiSchema = {
  "create-employee": parseAsBoolean.withDefault(false),
  "edit-employee": parseAsString, // ID сотрудника для редактирования
  "view-employee": parseAsString, // ID для просмотра деталей
};

export const employeeParamsSchema = {
  name: parseAsString,
  banned: parseAsArrayOf(parseAsString),
  ranks: parseAsArrayOf(parseAsString).withDefault(
    undefined as unknown as string[],
  ),
  name_asc: parseAsStringLiteral(["true", "false"] as const).withDefault(
    "true",
  ),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
};

export type EmployeeUiParams = inferParserType<typeof employeeUiSchema>;
export type EmployeeParams = inferParserType<typeof employeeParamsSchema>;
export const employeeParamsCache =
  createSearchParamsCache(employeeParamsSchema);
