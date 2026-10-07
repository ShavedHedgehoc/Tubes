"use client";

import { useAppSession } from "./use-app-session";

export function useRoles() {
  const { data: session, status } = useAppSession();
  const roles = session?.user?.roles || [];
  const isLoading = status === "loading";
  return {
    roles,
    isUser: roles.includes("USER"),
    isPlanner: roles.includes("PLANNER"),
    isAdmin: roles.includes("ADMIN"),
    isAllowSummaryEdit: roles.includes("SUMMARY_EDIT"),

    isLoading,
    hasAnyRole: (requiredRoles: string[]) =>
      requiredRoles.some((role) => roles.includes(role)),
  };
}
