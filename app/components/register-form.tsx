"use client";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import { signup } from "@/app/actions/auth";

const RegisterForm = () => {
  const url = `api/external-data/auth/register`;

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const postData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      signIn("credentials", {
        email: postData.email,
        password: postData.password,
        callbackUrl: "/",
      });
      router.push("/");
    } else {
      console.log(response);
    }
  };

  return (
    <form action={signup} className="login-form">
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export { RegisterForm };
