"use server";

// import { signIn } from "next-auth/react";

import { SignupFormSchema, FormState } from "@/app/lib/definitions";

export async function signup(formData: FormData) {
  //   const { name, email, password } = Object.fromEntries(formData);
  //   const externalApiUrl = process.env.API_URL;
  //   const url = `${externalApiUrl}/auth/register`;
  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name: name, email: email, password: password }),
  //   });
  //   if (res.ok) {
  //     await signIn("credentials", {
  //       redirect: false,
  //       callbackUrl: "/",
  //       email: email,
  //       password: password,
  //       //   callbackUrl: "/",
  //     });
  //   } else {
  //     console.log(res);
  //   }

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const externalApiUrl = process.env.API_URL;
  const url = `${externalApiUrl}/auth/register`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields),
  });
  const user = res.json();

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
}
