import { parseAsInteger, parseAsBoolean, parseAsString } from "nuqs/server";

export const statusUiSchema = {
  "open-chart": parseAsBoolean.withDefault(false),
  "open-table": parseAsBoolean.withDefault(false),
  summary_id: parseAsInteger,
  post_val: parseAsInteger,
  conveyor_name: parseAsString,
  post_title: parseAsString,
};
