import * as z from "zod";

export const changeLabLockFormSchema = z.object({
  lockReasonId: z.number().int().nullable(),
});

export type ChangeLabLockFormValues = z.infer<typeof changeLabLockFormSchema>;
