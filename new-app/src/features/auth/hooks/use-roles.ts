"use client";

import { useAppSession } from "@/entities/user";

export function useRoles() {
  const { data: session, status } = useAppSession();
  const roles = session?.user?.roles || [];
  const isLoading = status === "loading";
  return {
    roles,
    isUser: roles.includes("USER"),
    isPlanner: roles.includes("Planner"),
    isAdmin: roles.includes("ADMIN"),

    isLoading,
    hasAnyRole: (requiredRoles: string[]) =>
      requiredRoles.some((role) => roles.includes(role)),
  };
}
