"use client";

import { useTresholdSearchParams } from "@/entities/treshold";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useMemo } from "react";

type Conveyor = {
  id: number;
  value: string;
};
interface ConveyorSelectorProps {
  conveyors?: Conveyor[]; // Сделали опциональным
}

export default function ConveyorSelector({
  conveyors = [],
}: ConveyorSelectorProps) {
  const listItems = useMemo(() => {
    const baseItems = [{ value: "All", description: "Все конвейеры" }];
    const mappedItems = conveyors.map((i) => ({
      value: i.id.toString(),
      description: i.value,
    }));
    return [...baseItems, ...mappedItems];
  }, [conveyors]);
  const { params, setParams } = useTresholdSearchParams();
  const currentValue = params.conveyors?.[0] ?? "All";

  const currentDescription = useMemo(() => {
    return (
      listItems.find((x) => x.value === currentValue)?.description ||
      "Все конвейеры"
    );
  }, [currentValue, listItems]);

  const onValueChange = (value: string) => {
    setParams(
      { conveyors: value === "All" ? null : [value], page: 1 },
      { shallow: false },
    );
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className=" w-[150px]  text-xs rounded-l-none  focus:ring-0 focus:ring-offset-0"
      >
        <SelectValue>{currentDescription}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {listItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
