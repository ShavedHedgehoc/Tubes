"use client";

import { useTresholdSearchParams } from "@/entities/treshold";
import { cn } from "@/shared/lib";
import { Button, ButtonGroup, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { throttle } from "nuqs";

export default function MarkingInput() {
  const { params, setParams } = useTresholdSearchParams();
  const value = params.marking || "";

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setParams(
      { marking: newValue || null, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  const handleReset = () => {
    setParams({ marking: null, page: 1 });
  };

  return (
    <ButtonGroup className="h-8 ">
      <Input
        placeholder="Поиск по артикулу...  "
        value={value}
        onChange={handleChangeCode}
        className={cn(
          "w-40 h-8 border-r-0 rounded-none",
          "ring-0! ring-offset-0! shadow-none!",
          "outline-none! focus-visible:outline-none!",
          "focus:border-input focus-visible:border-input",
          "relative focus:z-10",
        )}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className={cn(
          "rounded-r-none border-l-0 border-r-0 h-8",
          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
        )}
      >
        <X />
      </Button>
    </ButtonGroup>
  );
}
