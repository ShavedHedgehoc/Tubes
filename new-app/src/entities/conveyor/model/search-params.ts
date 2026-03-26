import { parseAsString, parseAsInteger, parseAsBoolean } from "nuqs/server";

export const conveyorUiSchema = {
  "summary-id": parseAsInteger,
  "post-val": parseAsInteger,
  "post-title": parseAsString,
  "conveyor-id": parseAsInteger,
  "close-post": parseAsBoolean.withDefault(false),
  "select-available": parseAsBoolean.withDefault(false),
};
