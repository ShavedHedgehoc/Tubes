"use client";

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/shared/lib";
import { useMemo } from "react";
import { useSummarySearchParams } from "@/entities/summary";
import { CrewEntity } from "@/entities/crew";

export default function CrewCombobox({ items }: { items: CrewEntity[] }) {
  const { params, setParams } = useSummarySearchParams();

  const allItems = useMemo(() => {
    return [{ id: 0, name: "Без бригады" }, ...items];
  }, [items]);

  const idToDesc = useMemo(
    () => new Map(allItems.map((i) => [i.id.toString(), i.name])),
    [allItems],
  );

  if (items.length === 0) return null;

  const selectedIds = params.crews ?? [];

  const onSelect = (id: string) => {
    const current = new Set(selectedIds);

    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }

    const nextCrews = Array.from(current);
    setParams({
      crews: nextCrews.length > 0 ? nextCrews : null,
      page: 1,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="py-0 px-3 text-xs  rounded-l-none rounded-r-none border-r-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Бригады
          {selectedIds.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-border" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedIds.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedIds.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    Выбрано: {selectedIds.length}
                  </Badge>
                ) : (
                  selectedIds.map((id) => (
                    <Badge
                      variant="secondary"
                      key={id}
                      className="rounded-sm px-1 font-normal"
                    >
                      {idToDesc.get(id)}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="bg-background shadow-none">
          <CommandInput placeholder="Поиск..." autoFocus />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {allItems.map((item) => {
                const isSelected = selectedIds.includes(item.id.toString());
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => onSelect(item.id.toString())}
                    className="flex items-center"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50",
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="flex-1">{item.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedIds.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setParams({ crews: null, page: 1 });
                    }}
                    className="justify-center text-center text-sm font-medium"
                  >
                    Очистить всё
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
