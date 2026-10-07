import {
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs/server";

export const conveyorUiSchema = {
  "summary-id": parseAsInteger,
  "post-val": parseAsInteger,
  "post-title": parseAsString,
  "conveyor-id": parseAsInteger,
  "crew-id": parseAsArrayOf(parseAsString),
  "close-post": parseAsBoolean.withDefault(false),
  "select-available": parseAsBoolean.withDefault(false),
};
