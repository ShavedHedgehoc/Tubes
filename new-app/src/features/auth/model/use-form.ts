import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormValues } from "./schema";
import { signIn } from "next-auth/react";
import { useRegister } from "../hooks/use-register";
import { useState } from "react";
import { toast } from "sonner";

export const useAuthForm = (isRegister: boolean) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register } = useRegister();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "", name: "", isRegister },
  });

  const isPending = form.formState.isSubmitting || isSuccess;

  async function onSubmit(data: LoginFormValues) {
    try {
      if (isRegister) {
        await register({
          email: data.email,
          password: data.password,
          name: data.name!,
        });
      }
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        const errMsg = result.error;
        toast.error(errMsg);
      } else {
        setIsSuccess(true);
        window.location.replace("/");
        form.reset();
      }
    } catch (_error) {}
  }
  return { form, onSubmit, isSubmitting: isPending };
};
