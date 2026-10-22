import { SummuryAvailableResponse } from "@/entities/summary";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { AvailableSummariesTable } from "./available-summaries-table";
import { useConveyorUiParams } from "@/entities/conveyor";

interface Props {
  data: SummuryAvailableResponse;
}

export function AvailableSummariesView({ data }: Props) {
  const { setParams } = useConveyorUiParams();
  const handleClick = () => {
    setParams({
      "conveyor-id": null,
      "select-available": null,
      "crew-id": null,
      "is-setup": null,
    });
  };
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
      <CardContent className="grow overflow-y-auto p-0 min-h-0">
        <AvailableSummariesTable data={data} />
      </CardContent>
      <CardFooter className="px-5 border-t bg-muted/20 flex flex-row items-center justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Отмена
        </Button>
      </CardFooter>
    </Card>
  );
}
