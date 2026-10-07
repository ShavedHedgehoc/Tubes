import { apiClient, proxyApiClient } from "@/shared/api";
import { STATUS_ENDPOINTS } from "./endpoints";

import { AllStatusResponse, Ids } from "../model/types";
import { DEFAULT_PAGE_LIMIT, StatusParams } from "../model";
import { StatusListResponseDto } from "./dto/status-list-response.dto";
import { StatusTableRowState } from "@/features/post-table/model/types";

export type GetStatusesArgs = StatusParams & {
  options?: { isServer: boolean };
};

export async function getStatusesList({
  options,
  ...params
}: GetStatusesArgs): Promise<AllStatusResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<StatusListResponseDto>(
    STATUS_ENDPOINTS.STATUSES_LIST,
    params,
  );

  const { summary, statuses: _statuses, ...rest } = res;
  const { conveyor, batch, product, ...summaryRest } = summary;
  const flattenedSummary = {
    ...summaryRest,
    date: new Date(summaryRest.date),
    conveyorName: conveyor?.name ?? null,
    batchName: batch?.name ?? null,
    productName: product?.name ?? null,
    productCode: product?.code ?? null,
    productMarking: product?.marking ?? null,
  };

  const mappedStatuses = res.statuses.map((status, idx) => {
    let prevItemWithSamePost = null;
    for (let i = idx - 1; i >= 0; i--) {
      if (res.statuses[i].post.value === status.post.value) {
        prevItemWithSamePost = res.statuses[i];
        break;
      }
    }
    let state: StatusTableRowState = "Внесение параметров";
    if (status.idle) {
      state = "Начало операции";
    } else if (status.finished) {
      state = "Окончание работы";
    } else if (prevItemWithSamePost?.idle) {
      state = "Конец операции";
    }
    const ids: Ids = {
      extrusion_param_id: status.extrusion_param_id,
      varnish_param_id: status.varnish_param_id,
      offset_param_id: status.offset_param_id,
      sealant_param_id: status.sealant_param_id,
      maintenance_session_id: status.maintenance_session_id,
    };
    const { employee, operation, maintenance_session, post, ...rest } = status;
    return {
      ...rest,
      operation_description: operation?.description ?? null,
      maintenance_description:
        maintenance_session?.maintenance?.description ?? null,
      employee_name: employee?.name ?? null,
      post_val: post.value,
      ids: ids,
      state: state,
    };
  });
  return {
    summary: flattenedSummary,
    statuses: mappedStatuses,
    total: rest.total,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}
