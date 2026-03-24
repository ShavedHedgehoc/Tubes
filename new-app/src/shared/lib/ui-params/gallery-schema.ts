import { parseAsBoolean, parseAsInteger, parseAsString } from "nuqs/server";

export const galleryUiSchema = {
  addGalleryOpen: parseAsBoolean.withDefault(false),
  addGalleryEntityId: parseAsInteger,
  selectedFileId: parseAsInteger,
  previewFileName: parseAsString,
  gallerySearch: parseAsString.withDefault(""),
};
