
import { apiClient, proxyApiClient } from "@/shared/api";
import { SummaryEntity } from "../model";
import { SummaryDetailDto } from "./dto";
import { SUMMARY_ENDPOINTS } from "./endpoint";


export type GetSummaryArgs = {
    id: string | null;
    options?: { isServer: boolean };
};

export const getSummary = async ({
    options,
    id,
}: GetSummaryArgs): Promise<SummaryEntity> => {
    const client = options?.isServer ? apiClient : proxyApiClient;
    const res = await client.get<SummaryDetailDto>(`${SUMMARY_ENDPOINTS.DETAIL}/${id}`);
    const parsedDate = new Date(res.date)
    const product = { id: res.product_id, code: res.product_code, name: res.product_name, marking: res.marking }
    const batch = { id: res.batch_id, name: res.batch_name }
    const conveyor = { id: res.conveyor_id, name: res.conveyor_name }
    // Временно
    const count = {
        extrusion_statuses: 0,
        varnish_statuses: 0,
        offset_statuses: 0,
        sealant_statuses: 0
    }
    return { ...res, date: parsedDate, product: product, batch: batch, conveyor: conveyor, _count: count }
};
