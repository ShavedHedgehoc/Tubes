import {
  parseAsString,
  parseAsInteger,
  createSearchParamsCache,
  inferParserType,
} from "nuqs/server";

export const productUiSchema = {
  "change-product-weight": parseAsString, // ID продукта
};

export const productParamsSchema = {
  code: parseAsString,
  marking: parseAsString,
  name: parseAsString,
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
};

export type ProductParams = inferParserType<typeof productParamsSchema>;
export const productParamsCache = createSearchParamsCache(productParamsSchema);
