"use client";

import { useOperationSearchParams } from "@/entities/operation";
// import { RankEntity } from "@/entities/rank";
import { cn } from "@/shared/lib";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useMemo } from "react";

const LIST_ITEMS = [
  { value: "All", description: "Все операции" },
  { value: "1", description: "Активные" },
  { value: "2", description: "Неактивные" },
];

export default function ActiveSelector() {
  // {  rankListItems,}: {  rankListItems: RankEntity[];}
  const { params, setParams } = useOperationSearchParams();
  const currentValue = params.isInactive?.[0] ?? "All";

  const currentDescription = useMemo(() => {
    return (
      LIST_ITEMS.find((x) => x.value === currentValue)?.description || "Все"
    );
  }, [currentValue]);

  const onValueChange = (value: string) => {
    setParams(
      { isInactive: value === "All" ? null : [value], page: 1 },
      { shallow: false },
    );
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          "w-[120px]  text-xs rounded-l-none",
          //   rankListItems.length !== 0 && "rounded-r-none border-r-0",
          "focus:ring-0 focus:ring-offset-0",
        )}
      >
        <SelectValue>{currentDescription}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {LIST_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
