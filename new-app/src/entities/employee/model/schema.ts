import * as z from "zod";

export const createEmployeeFormSchema = z.object({
  name: z
    .string()
    .min(5, "Имя должно содержать минимум 5 символов.")
    .max(32, "Имя слишком длинное"),
  barcode: z
    .string()
    .regex(/^\d+$/, "Штрихкод может содержать только цифры")
    .length(13, "Штрихкод должен быть длиной 13 символов"),
  rank_id: z.number("Выберите разряд").int(),
});

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeFormSchema>;
