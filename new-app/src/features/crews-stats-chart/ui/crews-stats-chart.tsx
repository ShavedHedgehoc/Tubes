import { CrewStat } from "@/entities/summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Cell,
  LabelList,
} from "recharts";

interface Props {
  title: string;
  chartData: CrewStat[];
  isDefect: boolean;
}

export function CrewsStatsChart({ title, chartData, isDefect }: Props) {
  const executionGoal = chartData[0]?.execution_goal ?? 80;
  const defectRateGoal = chartData[0]?.defect_rate_goal ?? 2;

  const dataKey = isDefect ? "defect_percent" : "execution";
  const currentGoal = isDefect ? defectRateGoal : executionGoal;
  const name = isDefect ? "Брак, %" : "Выполнение плана, %";

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 45, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="crew_name" />
            <YAxis domain={isDefect ? [0, "auto"] : [0, 110]} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend />

            {currentGoal !== null && (
              <ReferenceLine
                y={currentGoal}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{
                  position: "right",
                  value: `${currentGoal}%`,
                  fill: "#ef4444",
                  fontSize: 12,
                }}
              />
            )}

            <Bar dataKey={dataKey} name={name} radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey={dataKey}
                position="top"
                formatter={(value: unknown) => {
                  if (typeof value === "number") {
                    return `${value}%`;
                  }
                  if (typeof value === "string") {
                    return value;
                  }
                  return "";
                }}
                style={{ fontSize: "12px", fontWeight: "500", fill: "#666" }}
              />
              {chartData.map((entry, index) => {
                const value = entry[dataKey] ?? 0;
                const isBad = isDefect
                  ? currentGoal !== null && value > currentGoal
                  : currentGoal !== null && value < currentGoal;

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isBad ? "#ef4444" : "#22c55e"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
