"use client"


import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui";
import { Label, Pie, PieChart } from "recharts"


// Define a simple interface for the reusable data
export interface MaterialChartItem {
    name: string;
    scanned: boolean;
    value?: number; // Usually 1 for equal segments
}

interface MaterialPieChartProps {
    data: MaterialChartItem[];
    title?: string;
    description?: string;
    emptyMessage?: string;
}

export function MaterialPieChart({
    data,
    title = "OK",
    description = "Комплектующие",
    emptyMessage = "Спецификация не найдена"
}: MaterialPieChartProps) {

    // Prepare data for Recharts
    const chartData = data.map((item) => ({
        name: item.name,
        value: item.value ?? 1,
        fill: item.scanned ? "var(--color-scanned)" : "var(--color-missing)",
    }));

    const chartConfig = {
        value: { label: "Количество" },
    } satisfies ChartConfig;

    const isAllScanned = data.length > 0 && !data.some((item) => !item.scanned);

    return (
        <div className="bg-card w-full h-full rounded-lg p-8 flex items-center justify-center border">
            <div className="flex flex-col h-full justify-center w-full items-center">
                {chartData.length ? (
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            {/* <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={75}
                                strokeWidth={5}
                                paddingAngle={8}
                            > */}
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={75}
                                strokeWidth={5}
                                paddingAngle={8}
                                // Добавляем отрисовку меток
                                label={({ name, x, y, cx, cy, midAngle }) => {
                                    // Логика позиционирования текста (аналогично вашему старому коду)
                                    const textAnchor = x > cx ? "start" : "end";

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="var(--color-muted-foreground)"
                                            fontSize="12"
                                            textAnchor={textAnchor}
                                            dominantBaseline="central"
                                        >
                                            {/* Разбиваем длинное имя на строки, если нужно, 
            или просто выводим первые 10 символов */}
                                            {name.length > 15 ? `${name.slice(0, 12)}...` : name}
                                        </text>
                                    );
                                }}
                                labelLine={false} // Линии обычно загромождают интерфейс, лучше без них
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                        {isAllScanned ? title : "!"}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs">
                                                        {isAllScanned ? description : "Отсканируйте"}
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <p className="text-muted-foreground text-md">{emptyMessage}</p>
                )}
            </div>
        </div>
    );
}
