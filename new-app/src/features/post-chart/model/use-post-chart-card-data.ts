import { StatusEntity } from "@/entities/status";
import { useMemo } from "react";

export function usePostChartCardData(statuses: StatusEntity[] = []) {
  return useMemo(() => {
    if (!statuses || statuses.length === 0) {
      return { chartData: [], idleIntervals: [], processedData: [] };
    }
    const processedData = statuses.map((item) => ({
      ...item,
      time: new Date(item.createdAt).getTime(),
    }));
    const idleIntervals: { start: number; end: number }[] = [];
    let currentStart: number | null = null;

    processedData.forEach((item, index) => {
      if (item.idle && currentStart === null) {
        currentStart = item.time;
      } else if (!item.idle && currentStart !== null) {
        idleIntervals.push({ start: currentStart, end: item.time });
        currentStart = null;
      }
      if (index === processedData.length - 1 && currentStart !== null) {
        idleIntervals.push({ start: currentStart, end: item.time });
      }
    });
    const totalIdleTimes = statuses.reduce(
      (acc, item) => acc + (item.idle_time ?? 0),
      0,
    );

    const firstDate = statuses[0]?.createdAt;
    const lastDate = statuses[statuses.length - 1]?.createdAt;
    const startDate = statuses[0]?.createdAt
      ? new Date(statuses[0].createdAt).getTime()
      : 0;
    const endDate = statuses[statuses.length - 1]?.createdAt
      ? statuses[statuses.length - 1]?.finished
        ? new Date(statuses[statuses.length - 1]?.createdAt).getTime()
        : null
      : null;

    const totalTime =
      firstDate && lastDate
        ? new Date(lastDate).getTime() - new Date(firstDate).getTime()
        : 0;

    const idlePercent =
      totalTime > 0
        ? Number(((totalIdleTimes / totalTime) * 100).toFixed(2))
        : 0;
    const chartData = processedData.map((item) => {
      return {
        time: item.time,
        val: item.counter_value,
        description: item.operation_description || item.maintenance_description,
        employee: item.employee_name,
        isIdle: item.idle,
      };
    });

    return {
      chartData,
      idleIntervals,
      processedData,
      startDate,
      endDate,
      totalIdleTimes,
      totalTime,
      idlePercent,
    };
  }, [statuses]);
}
