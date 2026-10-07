import { CrewStat } from "@/entities/summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  title: string;
  chartData: CrewStat[];
}

export function CrewsIdlesChart({ title, chartData }: Props) {
  const data = chartData.map((item) => ({
    crew_name: item.crew_name,
    ...item.idles,
  }));

  const postNames = Array.from(
    new Set(chartData.flatMap((item) => Object.keys(item.idles))),
  ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Цвета для разных постов (можно расширить массив)
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="crew_name" tick={{ fontSize: 12 }} interval={0} />
            <YAxis
              label={{ value: "минуты", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              formatter={(value: unknown) => {
                if (typeof value === "number") {
                  return `${value.toFixed(0)} мин`;
                }
                if (typeof value === "string") {
                  return value;
                }
                return "";
              }}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            {postNames.map((postName, index) => (
              <Bar
                key={postName}
                dataKey={postName}
                name={postName}
                fill={colors[index % colors.length]}
                radius={
                  index === postNames.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
                }
              >
                <LabelList
                  dataKey={postName}
                  position="top"
                  formatter={(value: unknown) => {
                    if (typeof value === "number") {
                      return value.toFixed(0);
                    }
                    if (typeof value === "string") {
                      return value;
                    }
                    return "";
                  }}
                  style={{ fontSize: "12px", fontWeight: "500", fill: "#666" }}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
