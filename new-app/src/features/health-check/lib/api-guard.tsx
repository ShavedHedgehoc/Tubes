"use client";

import { useShallow } from "zustand/react/shallow";
import { useHealthcheck } from "../api";
import { useHealthStore } from "../model";
import { ServerFalldown } from "../ui";

export function ApiGuard({ children }: { children: React.ReactNode }) {
  const isHealthy = useHealthStore(useShallow((state) => state.isHealthy));
  const init = useHealthStore(useShallow((state) => state.init));

  useHealthcheck();

  if (!isHealthy && init) {
    return <ServerFalldown isAuto={true} />;
  }

  return <>{children}</>;
}
