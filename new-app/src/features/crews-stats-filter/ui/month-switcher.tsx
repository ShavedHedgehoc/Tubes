import { useSummaryCrewsStatsSearchParams } from "@/entities/summary";
import { parseDate } from "@/shared/lib";
import { Button, ButtonGroup } from "@/shared/ui";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"; // если используешь иконки

export function MonthSwitcher() {
  const { params, setParams } = useSummaryCrewsStatsSearchParams();

  const now = new Date();
  const currentMonthStart = format(startOfMonth(now), "yyyy-MM-dd");
  const currentMonthEnd = format(endOfMonth(now), "yyyy-MM-dd");

  const isCurrentMonthActive =
    params.start_date === currentMonthStart &&
    params.end_date === currentMonthEnd;

  const sDate = parseDate(params.start_date);
  const eDate = parseDate(params.end_date);

  const isFullMonthSelected =
    sDate &&
    eDate &&
    params.start_date === format(startOfMonth(sDate), "yyyy-MM-dd") &&
    params.end_date === format(endOfMonth(sDate), "yyyy-MM-dd");

  const updateMonthRange = (date: Date) => {
    setParams({
      start_date: format(startOfMonth(date), "yyyy-MM-dd"),
      end_date: format(endOfMonth(date), "yyyy-MM-dd"),
    });
  };

  const handlePrevMonth = () => {
    const currentStart = parseDate(params.start_date) || new Date();
    updateMonthRange(subMonths(currentStart, 1));
  };

  const handleNextMonth = () => {
    const currentStart = parseDate(params.start_date) || new Date();
    updateMonthRange(addMonths(currentStart, 1));
  };

  const handleCurrentMonth = () => {
    updateMonthRange(new Date());
  };

  return (
    <ButtonGroup className="h-8 border rounded-md">
      <Button
        size="sm"
        variant="ghost"
        className="rounded-r-none"
        onClick={handlePrevMonth}
        disabled={!isFullMonthSelected}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="py-0 px-3 text-xs "
        onClick={handleCurrentMonth}
        disabled={isCurrentMonthActive}
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        Месяц
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="rounded-l-none"
        onClick={handleNextMonth}
        disabled={!isFullMonthSelected}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
}
