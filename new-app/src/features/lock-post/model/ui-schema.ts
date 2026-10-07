import { parseAsString, parseAsInteger, parseAsBoolean } from "nuqs/server";

export const labLockUiSchema = {
  summary_id: parseAsInteger,
  post_val: parseAsInteger,
  post_title: parseAsString,
  conveyor_name: parseAsString,
  state: parseAsBoolean.withDefault(false),
  "change-lock": parseAsBoolean.withDefault(false),
};
