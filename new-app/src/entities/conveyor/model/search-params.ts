import { parseAsString, parseAsInteger, parseAsBoolean } from "nuqs/server";

export const conveyorUiSchema = {
  "close-post": parseAsBoolean.withDefault(false),
  "summary-id": parseAsInteger,
  "post-id": parseAsInteger,
  "post-title": parseAsString,
  "select-available": parseAsBoolean.withDefault(false),
  "conveyor-id": parseAsInteger,
};
