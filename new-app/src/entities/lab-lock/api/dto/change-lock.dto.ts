export type ChangeLockDto = {
  summary_id: number;
  post_val: number;
  lock_reason_id: number | null;
  user_id: number;
  state: boolean;
};
