import React from "react";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/shared/ui";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { formatTimeOnly } from "@/shared/lib";
import { format } from "date-fns";

const colors = {
  production: "#0d9488",
  idle: "#f59e0b",
};

const chartConfig = {
  val: {
    label: "Выпуск",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type chartDataType = {
  time: number;
  val: number | null;
  description: string | null;
  employee: string | null;
  isIdle?: boolean;
};

type idleIntervalType = {
  start: number;
  end: number;
};

type processedDataType = {
  time: number;
  id: number;
  summary_id: number;
  post_id: number;
  counter_value: number;
  operation_id: number | null;
  operation_description: string | null;
  idle: false;
  employee_id: number | null;
  employee_name: string | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
};

export function PostChart({
  chartData,
  idleIntervals,
  processedData,
}: {
  chartData: chartDataType[];
  idleIntervals: idleIntervalType[];
  processedData: processedDataType[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: -12,
          right: 12,
          bottom: 10,
          top: 10,
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(val) => formatTimeOnly(new Date(val))}
        />
        <YAxis
          yAxisId="left"
          dataKey="val"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
        />
        {idleIntervals.map((interval, idx) => {
          const isLastAndActive =
            idx === idleIntervals.length - 1 &&
            processedData[processedData.length - 1].idle;

          return (
            <React.Fragment key={idx}>
              <ReferenceLine
                x={interval.start}
                stroke={colors.idle}
                strokeWidth={2}
                yAxisId="left"
              />
              {!isLastAndActive && (
                <ReferenceLine
                  x={interval.end}
                  stroke={colors.idle}
                  strokeWidth={2}
                  yAxisId="left"
                />
              )}
              <ReferenceArea
                x1={interval.start}
                x2={interval.end}
                yAxisId="left"
                fill={colors.idle}
                fillOpacity={0.15}
                strokeOpacity={0}
              />
            </React.Fragment>
          );
        })}
        <Line
          dataKey="val"
          type="stepAfter"
          stroke={colors.production}
          strokeWidth={2}
          dot={{ r: 2, stroke: colors.production }}
          activeDot={{ r: 6, stroke: colors.production }}
          connectNulls={false}
          isAnimationActive={false}
        />
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="flex flex-col">
                  <div className="text-lg">
                    {data.isIdle && <span> {data.description}</span>}
                    {!data.isIdle && <span>{data.val}</span>}
                  </div>
                  <div className="flex flex-row gap-1">
                    {<span>{data.employee ?? "Неизвестно"}</span>}
                    {<span>({format(data.time, "HH:mm:ss")})</span>}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
