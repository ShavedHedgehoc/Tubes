"use client";

import { format } from "date-fns";
import { getMonthBounds } from "@/shared/lib";
import { useSummarySearchParams } from "@/entities/summary";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function ResetButton() {
  const { params, setParams } = useSummarySearchParams();

  const isDirty =
    params.start_date !== format(getMonthBounds().firstDay, "yyyy-MM-dd") ||
    params.end_date !== format(getMonthBounds().lastDay, "yyyy-MM-dd") ||
    params.code !== null ||
    (params.conveyors && params.conveyors.length > 0) ||
    (params.crews && params.crews.length > 0) ||
    params.states !== null;

  const handleReset = () => {
    setParams(null);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="py-0 px-3 text-xs "
      onClick={handleReset}
      disabled={!isDirty}
    >
      <Trash /> Сброс
    </Button>
  );
}
