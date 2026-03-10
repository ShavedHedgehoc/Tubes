import * as z from "zod";

export const postCloseFormSchema = z.object({
  defectValue: z
    .number({ error: "Введите число" })
    .min(0, "Минимум 0")
    .max(1000, "Максимум 1000"),
});

export type PostCloseFormValues = z.infer<typeof postCloseFormSchema>;
