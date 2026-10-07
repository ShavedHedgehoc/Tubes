import * as z from "zod";
export const changeProductWeightSchema = z.object({
  weight: z
    .number("Введите вес")
    .min(0, "Должно быть больше нуля.")
    .max(0.02, "Должно быть меньше 0б02."),
});

export type ChangeProductWeightFormValues = z.infer<
  typeof changeProductWeightSchema
>;
