import { queryOptions } from "@tanstack/react-query";
import { getExtrusionParam } from "./get-extrusion-param";
import { getVarnishParam } from "./get-varnish-param";
import { getOffsetParam } from "./get-offset-param";
import { getSealantParam } from "./get-sealant-param";

export const paramaterQueries = {
  all: () => ["parameters"],
  details: () => [...paramaterQueries.all(), "detail"],
  extrusion: () => [...paramaterQueries.details(), "extrusion"],
  extrusion_detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...paramaterQueries.extrusion(), id],
      queryFn: () => getExtrusionParam({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
  varnish: () => [...paramaterQueries.details(), "varnish"],
  varnish_detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...paramaterQueries.varnish(), id],
      queryFn: () => getVarnishParam({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
  offset: () => [...paramaterQueries.details(), "offset"],
  offset_detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...paramaterQueries.offset(), id],
      queryFn: () => getOffsetParam({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
  sealant: () => [...paramaterQueries.details(), "sealant"],
  sealant_detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...paramaterQueries.sealant(), id],
      queryFn: () => getSealantParam({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
