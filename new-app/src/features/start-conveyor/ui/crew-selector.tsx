import { useConveyorUiParams } from "@/entities/conveyor";
import { CrewEntity } from "@/entities/crew";
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
  crewItems: CrewEntity[] | [];
}
export function CrewSelector({ crewItems = [] }: Props) {
  const { params, setParams } = useConveyorUiParams();
  if (crewItems.length === 0)
    return (
      <div className="flex items-center pr-6 text-xs">
        Выбор бригады недоступен
      </div>
    );

  const currentValue = params["crew-id"]?.[0] ?? undefined;
  const onValueChange = (value: string) => {
    setParams({ "crew-id": [value] }, { shallow: false });
  };
  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          "w-[160px]  text-xs rounded-l-none",
          "focus:ring-0 focus:ring-offset-0",
        )}
      >
        <SelectValue placeholder="Выберите бригаду" />
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {crewItems.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
