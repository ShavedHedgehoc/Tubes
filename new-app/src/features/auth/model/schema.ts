import * as z from "zod";

export const loginFormSchema = z
  .object({
    email: z.email("Некорректный email"),
    password: z.string().min(1, "Минимум 1 символ"),
    name: z.string().optional(), // Опционально для логина
    isRegister: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isRegister && !data.name) return false;
      return true;
    },
    {
      message: "Имя обязательно для регистрации",
      path: ["name"],
    },
  );

export type LoginFormValues = z.infer<typeof loginFormSchema>;
