import { PARAMS_ROUTES, ParamsIds } from "../model"

export function getParamsRouteByIds(ids: ParamsIds): string | null {
    if (ids.extrusion_param_id) return `${PARAMS_ROUTES.EXTRUSION}/${ids.extrusion_param_id}`
    if (ids.varnish_param_id) return `${PARAMS_ROUTES.VARNISH}/${ids.varnish_param_id}`
    if (ids.offset_param_id) return `${PARAMS_ROUTES.OFFSET}/${ids.offset_param_id}`
    if (ids.sealant_param_id) return `${PARAMS_ROUTES.SEALANT}/${ids.sealant_param_id}`
    return null
}