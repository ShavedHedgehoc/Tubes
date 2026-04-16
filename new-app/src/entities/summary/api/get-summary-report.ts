import { apiClient, proxyApiClient } from "@/shared/api";
import { SummaryReportDto } from "./dto";
import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummaryReportEntity, Treshold } from "../model";

export type GetSummaryReportArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getSummaryReport = async ({
  options,
  id,
}: GetSummaryReportArgs): Promise<SummaryReportEntity> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<SummaryReportDto>(
    `${SUMMARY_ENDPOINTS.FULL_DETAIL}/${id}`,
  );

  const {
    summary,
    defects,
    consumed_materials,
    statuses,
    extrusionParams,
    varnishParams,
    offsetParams,
    sealantParams,
    tresholds,
  } = res;

  const parsedDate = new Date(summary.date);
  const parsedDefects = defects.map((defect) => {
    return {
      postId: defect.post_id,
      postValue: defect.post.value,
      value: defect.value,
    };
  });

  const parsedConsumedMaterials = consumed_materials.map((item) => {
    return {
      employee_id: item.employee_id,
      createdAt: item.createdAt,
      materialCode: item.material.code,
      materialName: item.material.name,
      postNumber: item.material.post_number,
      lotName: item.lot.value,
    };
  });

  const parsedStatuses = statuses.map((status) => {
    return {
      id: status.id,
      summary_id: status.summary_id,
      post_id: status.post_id,
      post_val: status.post.value,
      counter_value: status.counter_value,
      operation_id: status.operation_id,
      operation_value: status.operation?.value ?? null,
      operation_description: status.operation?.description ?? null,
      maintenance_session_id: status.maintenance_session_id ?? null,
      maintenance_value: status.maintenance_session?.maintenance?.value ?? null,
      maintenance_description:
        status.maintenance_session?.maintenance?.description ?? null,
      idle: status.idle,
      employee_id: status.employee_id,
      employee_name: status.employee?.name ?? null,
      idle_time: status.idle_time,
      finished: status.finished,
      createdAt: new Date(status.createdAt),
    };
  });

  const parsedExtrusionParams = extrusionParams.map((i) => {
    return {
      ...i,
      treshold: i.treshold
        ? { ...i.treshold, createdAt: new Date(i.treshold.createdAt) }
        : ({} as Treshold),
      createdAt: new Date(i.createdAt),
    };
  });
  const parsedVarnishParams = varnishParams.map((i) => {
    return {
      ...i,
      treshold: i.treshold
        ? { ...i.treshold, createdAt: new Date(i.treshold.createdAt) }
        : ({} as Treshold),
      createdAt: new Date(i.createdAt),
    };
  });
  const parsedOffsetParams = offsetParams.map((i) => {
    return {
      ...i,
      treshold: i.treshold
        ? { ...i.treshold, createdAt: new Date(i.treshold.createdAt) }
        : ({} as Treshold),
      createdAt: new Date(i.createdAt),
    };
  });
  const parsedSealantParams = sealantParams.map((i) => {
    return {
      ...i,
      treshold: i.treshold
        ? { ...i.treshold, createdAt: new Date(i.treshold.createdAt) }
        : ({} as Treshold),
      createdAt: new Date(i.createdAt),
    };
  });

  return {
    summary: {
      ...summary,
      date: parsedDate,
      batchName: summary.batch.name ?? null,
      conveyorName: summary.conveyor.name ?? null,
      productCode: summary.product.code ?? null,
      productName: summary.product.name ?? null,
      productMarking: summary.product.marking ?? null,
    },
    tresholds: tresholds
      ? { ...tresholds, createdAt: new Date(tresholds.createdAt) }
      : null,
    defects: parsedDefects,
    consumedMaterials: parsedConsumedMaterials,
    statuses: parsedStatuses,
    extrusionParams: parsedExtrusionParams,
    varnishParams: parsedVarnishParams,
    offsetParams: parsedOffsetParams,
    sealantParams: parsedSealantParams,
  };
};
