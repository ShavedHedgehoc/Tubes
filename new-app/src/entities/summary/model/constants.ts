export const DEFAULT_PAGE_LIMIT = 10 as const;
export const SUMMARY_MODE = {
  TRANSITION: 1,
  WORK: 2,
} as const;

export const MODE_LIST_ITEMS = [
  { value: "All", description: "Все режимы" },
  { value: String(SUMMARY_MODE.TRANSITION), description: "Переход" },
  { value: String(SUMMARY_MODE.WORK), description: "Работа" },
];

// export type SummaryMode = (typeof SUMMARY_MODE)[keyof typeof SUMMARY_MODE];
