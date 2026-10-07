import { Batch, Conveyor, Employee, Product, Status, Summary } from "db";

type IState = "idle" | "working" | "finished" | "locked";
export interface IPostData {
  production: number | null;
  state: IState;
  hasLock: boolean;
  lockReason: string | null;
  employee: string | null;
}

export interface IMappedSummary {
  id: number;
  product_id: number | null;
  product_code: string | null;
  product_name: string | null;
  batch_id: number | null;
  batch_name: string | null;
  plan: number;
  shift: number | null;
  // isActive: bo
  // olean;
  // isFinished: boolean;

  extrusion: IPostData | null;
  varnish: IPostData | null;
  offset: IPostData | null;
  sealant: IPostData | null;
}

export interface IMappedConveyor {
  id: number;
  name: string;
  summary: IMappedSummary | null;
}

export const mappedConveyors = ({
  conveyor,
  summary,
  product,
  batch,
  extrusion_status,
  extrusion_employee,
  extrusion_has_lock,
  varnish_status,
  varnish_employee,
  varnish_has_lock,
  offset_status,
  offset_employee,
  offset_has_lock,
  sealant_status,
  sealant_employee,
  sealant_has_lock,
  extrusion_lock_reason,
  varnish_lock_reason,
  sealant_lock_reason,
  offset_lock_reason,
}: {
  conveyor: Conveyor;
  summary: Summary | null;
  product: Product | null;
  batch: Batch | null;
  extrusion_status: Status | null;
  extrusion_employee: Employee | null;
  extrusion_has_lock: boolean;

  varnish_status: Status | null;
  varnish_employee: Employee | null;
  varnish_has_lock: boolean;
  offset_status: Status | null;
  offset_employee: Employee | null;
  offset_has_lock: boolean;
  sealant_status: Status | null;
  sealant_employee: Employee | null;
  sealant_has_lock: boolean;
  extrusion_lock_reason: string | null;
  varnish_lock_reason: string | null;
  sealant_lock_reason: string | null;
  offset_lock_reason: string | null;
}): IMappedConveyor => {
  const mappedExtrusionStatus: IPostData | null = extrusion_status
    ? {
        employee: extrusion_employee ? extrusion_employee.name : null,
        production: extrusion_status.counter_value,
        hasLock: extrusion_has_lock,
        lockReason: extrusion_lock_reason,
        state:
          extrusion_status.finished === true
            ? "finished"
            : extrusion_status.idle === true
              ? extrusion_status.is_locked === true
                ? "locked"
                : "idle"
              : "working",
      }
    : null;
  const mappedVarnishStatus: IPostData | null = varnish_status
    ? {
        employee: varnish_employee ? varnish_employee.name : null,
        production: varnish_status.counter_value,
        hasLock: varnish_has_lock,
        lockReason: varnish_lock_reason,
        state:
          varnish_status.finished === true
            ? "finished"
            : varnish_status.idle === true
              ? varnish_status.is_locked === true
                ? "locked"
                : "idle"
              : "working",
      }
    : null;
  const mappedOffsetStatus: IPostData | null = offset_status
    ? {
        employee: offset_employee ? offset_employee.name : null,
        production: offset_status.counter_value,
        hasLock: offset_has_lock,
        lockReason: offset_lock_reason,
        state:
          offset_status.finished === true
            ? "finished"
            : offset_status.idle === true
              ? offset_status.is_locked === true
                ? "locked"
                : "idle"
              : "working",
      }
    : null;
  const mappedSealantStatus: IPostData | null = sealant_status
    ? {
        employee: sealant_employee ? sealant_employee.name : null,
        production: sealant_status.counter_value,
        hasLock: sealant_has_lock,
        lockReason: sealant_lock_reason,
        state:
          sealant_status.finished === true
            ? "finished"
            : sealant_status.idle === true
              ? sealant_status.is_locked === true
                ? "locked"
                : "idle"
              : "working",
      }
    : null;

  const mapped_summary: IMappedSummary | null = summary
    ? {
        id: summary.id,
        product_id: product ? product.id : null,
        product_code: product ? product.code : null,
        product_name: product ? product.name : null,
        plan: summary.plan,
        shift: summary.shift,
        batch_id: batch ? batch.id : null,
        batch_name: batch ? batch.name : null,
        extrusion: mappedExtrusionStatus,
        varnish: mappedVarnishStatus,
        offset: mappedOffsetStatus,
        sealant: mappedSealantStatus,
      }
    : null;

  return {
    id: conveyor.id,
    name: conveyor.name,
    summary: mapped_summary,
  };
};
