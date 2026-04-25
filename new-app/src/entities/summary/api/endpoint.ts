export const SUMMARY_ENDPOINTS = {
  LIST: "/summaries",
  UPLOAD: "/summaries",
  UPDATE: "/summaries",
  DELETE: "/summaries",
  DETAIL: "/summaries/detail",
  FULL_DETAIL: "/summaries/full_detail",
  STATUSES: "/summaries/summary_statuses",
  AVAILABLE: "/summaries/available?conveyor_id=",
  SET_ACTIVE: "/summaries/set_active",
  SET_FINISH: "/summaries/set_finish",
} as const;
