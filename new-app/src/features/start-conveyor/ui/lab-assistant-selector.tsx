import { useConveyorUiParams } from "@/entities/conveyor";
import { LabAssistantRow } from "@/entities/user";
import { cn } from "@/shared/lib";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

interface Props {
  labAssitantItems: LabAssistantRow[] | [];
}
export function LabAssistantSelector({ labAssitantItems = [] }: Props) {
  const { params, setParams } = useConveyorUiParams();
  if (labAssitantItems.length === 0)
    return (
      <div className="flex items-center pr-6 text-xs">
        Выбор инженера ОТК недоступен
      </div>
    );

  const currentValue = params["lab-assistant-id"]?.[0] ?? undefined;
  const onValueChange = (value: string) => {
    setParams({ "lab-assistant-id": [value] });
  };
  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn("w-60  text-xs", "focus:ring-0 focus:ring-offset-0")}
      >
        <SelectValue placeholder="Выберите инженера ОТК" />
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {labAssitantItems.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
