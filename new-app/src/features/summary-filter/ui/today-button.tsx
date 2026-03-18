"use client";

import { format } from "date-fns";
import { getToday } from "@/shared/lib";
import { useSummarySearchParams } from "@/entities/summary";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function TodayButton() {
  const { params, setParams } = useSummarySearchParams();
  const today = format(getToday(), "yyyy-MM-dd");
  const isNotToday = params.start_date !== today || params.end_date !== today;

  const handleSetToday = () => {
    setParams({ start_date: today, end_date: today, page: 1 });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="py-0 px-3 text-xs "
      onClick={handleSetToday}
      disabled={!isNotToday}
    >
      <Trash /> Сегодня
    </Button>
  );
}
