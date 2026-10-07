"use client";

import { format } from "date-fns";
import { getToday } from "@/shared/lib";
import { useSummarySearchParams } from "@/entities/summary";
import { Button } from "@/shared/ui/button";
import { Calendar1 } from "lucide-react";

export default function TodayButton() {
  const { params, setParams } = useSummarySearchParams();
  const getCurrentDate = () => format(getToday(), "yyyy-MM-dd");
  const today = getCurrentDate();
  const isNotToday = params.start_date !== today || params.end_date !== today;

  const handleSetToday = () => {
    const freshToday = getCurrentDate();
    setParams({ start_date: freshToday, end_date: freshToday, page: 1 });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="py-0 px-3 text-xs "
      onClick={handleSetToday}
      disabled={!isNotToday}
    >
      <Calendar1 /> Сегодня
    </Button>
  );
}
