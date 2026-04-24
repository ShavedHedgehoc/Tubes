"use client";

import { parameterApi, ParameterDetails } from "@/entities/parameter";
import { cn } from "@/shared/lib";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function ExtrusionParamsView({ id }: { id: string | null }) {
  const { data } = useQuery({
    ...parameterApi.paramaterQueries.extrusion_detail(id, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  return (
    <div
      className={cn(
        "container mx-auto py-10 transition-all duration-500 relative",
      )}
    >
      <ParameterDetails params={data ?? null} />
    </div>
  );
}
