export const PARAMS_ROUTES = {
  EXTRUSION_PARAMS: "/extrusion-params",
  VARNISH_PARAMS: "/varnish-params",
  OFFSET_PARAMS: "/offset-params",
  SEALANT_PARAMS: "/sealant-params",
  MAINTENANCE_SESSION: "/maintenance-session",
} as const;

export type ParamsIds = {
  maintenance_session_id: number | null;
  extrusion_param_id: number | null;
  varnish_param_id: number | null;
  offset_param_id: number | null;
  sealant_param_id: number | null;
};

export function getRouteByStatusIds(ids: ParamsIds): string | null {
  // if (ids.maintenance_session_id) {
  //   return `${PARAMS_ROUTES.MAINTENANCE_SESSION}/${ids.maintenance_session_id}`;
  // }
  if (ids.extrusion_param_id)
    return `${PARAMS_ROUTES.EXTRUSION_PARAMS}/${ids.extrusion_param_id}`;
  if (ids.varnish_param_id)
    return `${PARAMS_ROUTES.VARNISH_PARAMS}/${ids.varnish_param_id}`;
  if (ids.offset_param_id)
    return `${PARAMS_ROUTES.OFFSET_PARAMS}/${ids.offset_param_id}`;
  if (ids.sealant_param_id)
    return `${PARAMS_ROUTES.SEALANT_PARAMS}/${ids.sealant_param_id}`;
  return null;
}
