import type { ISummary } from "@/shared/api/services/summary-service";
import { formatTimeOnly } from "@/shared/helpers/date-time-formatters";
import { getStatusCountersData } from "@/shared/helpers/summary-data-parsers";
import { Chart, useChart } from "@chakra-ui/charts";
import { Box, VStack, Text } from "@chakra-ui/react";
import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

export default function ProductionLineChart({
  summaryData,
  postId,
}: {
  summaryData: ISummary | null;
  postId: number;
}) {
  const data = getStatusCountersData(postId, summaryData);
  const processedData = data.map((item) => ({
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

  const chartData = processedData.reduce(
    (acc, item, index, array) => {
      const prevItem = array[index - 1];
      if (prevItem && prevItem.idle !== item.idle) {
        acc.push({
          time: item.time,
          val: item.counter_value,
        });
      }
      acc.push({
        time: item.time,
        val: item.idle ? null : item.counter_value,
      });
      return acc;
    },
    [] as { time: number; val: number | null }[],
  );

  const lineChart = useChart({
    data: chartData,
    series: [{ name: "val", color: "teal.solid", label: "Выработка" }],
  });

  const orangeColor = lineChart.color("orange.solid");

  if (!summaryData?.tresholds) return null;

  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={4}>
      <VStack h="full" w="full" justify="center">
        {chartData.length ? (
          <Chart.Root boxSize="full" chart={lineChart} animation="none">
            <LineChart
              data={lineChart.data}
              margin={{ top: 25, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke={lineChart.color("border")}
                vertical={true}
              />

              <XAxis
                type="number"
                domain={["dataMin", "dataMax"]}
                dataKey={lineChart.key("time")}
                tickFormatter={(val) => formatTimeOnly(new Date(val))}
                stroke={lineChart.color("border")}
              />

              <YAxis
                yAxisId="left"
                dataKey={lineChart.key("val")}
                stroke={lineChart.color("border")}
              />

              {idleIntervals.map((interval, idx) => {
                const isLastAndActive =
                  idx === idleIntervals.length - 1 &&
                  processedData[processedData.length - 1].idle;

                return (
                  <React.Fragment key={idx}>
                    <ReferenceLine
                      x={interval.start}
                      stroke={orangeColor}
                      strokeWidth={2}
                      yAxisId="left"
                    />
                    {!isLastAndActive && (
                      <ReferenceLine
                        x={interval.end}
                        stroke={orangeColor}
                        strokeWidth={2}
                        yAxisId="left"
                      />
                    )}
                    <ReferenceArea
                      x1={interval.start}
                      x2={interval.end}
                      yAxisId="left"
                      fill={orangeColor}
                      fillOpacity={0.15}
                      strokeOpacity={0}
                    />
                  </React.Fragment>
                );
              })}

              <Legend content={<Chart.Legend />} />

              <Line
                yAxisId="left"
                dot={false}
                type="stepAfter"
                dataKey={lineChart.key("val")}
                stroke={lineChart.color("teal.solid")}
                strokeWidth={2}
                isAnimationActive={false}
                connectNulls={false}
              />
            </LineChart>
          </Chart.Root>
        ) : (
          <Text color="fg.subtle">Записи не найдены</Text>
        )}
      </VStack>
    </Box>
  );
}
