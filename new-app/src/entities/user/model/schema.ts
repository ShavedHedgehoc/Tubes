import * as z from "zod";

export const editUserFormSchema = z.object({
    name: z
        .string()
        .min(5, "Имя должно содержать минимум 5 символов.")
        .max(32, "Имя слишком длинное"),
    email: z
        .email("Это не электропочта")

});

export type EditUserFormValues = z.infer<typeof editUserFormSchema>;
