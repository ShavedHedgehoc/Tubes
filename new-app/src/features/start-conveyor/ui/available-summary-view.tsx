import { SummuryAvailableResponse } from "@/entities/summary";
import { Card, CardHeader, CardTitle, ScrollArea } from "@/shared/ui";
import { AvailableSummariesTable } from "./available-summaries-table";

interface Props {
  data: SummuryAvailableResponse;
}

export function AvailableSummariesView({ data }: Props) {
  return (
    <Card className="w-full bg-background shadow-none border rounded-xl flex flex-col max-h-[65vh] overflow-hidden">
      <CardHeader className="py-4 px-5 border-b bg-muted/20 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-black uppercase tracking-widest opacity-70">
          Доступные сменные задания
        </CardTitle>
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          Найдено: {data.summaries.length}
        </span>
      </CardHeader>
      <ScrollArea className="grow">
        <AvailableSummariesTable data={data} />
      </ScrollArea>
    </Card>
  );
}
