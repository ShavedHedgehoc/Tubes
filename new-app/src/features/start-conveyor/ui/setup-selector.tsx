import { useConveyorUiParams } from "@/entities/conveyor";
import { cn } from "@/shared/lib";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

const setupItems = [
  { id: "0", value: "Работа" },
  { id: "1", value: "Переход" },
];
export function SetupSelector() {
  const { params, setParams } = useConveyorUiParams();

  const currentValue = params["is-setup"]?.[0] ?? setupItems[0].id;
  const onValueChange = (value: string) => {
    setParams({ "is-setup": [value] });
  };
  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn("w-40 text-xs", "focus:ring-0 focus:ring-offset-0")}
      >
        <SelectValue placeholder="Выберите режим" />
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {setupItems.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
