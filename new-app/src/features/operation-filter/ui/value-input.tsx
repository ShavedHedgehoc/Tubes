"use client";

import { useOperationSearchParams } from "@/entities/operation";
import { cn } from "@/shared/lib";
import { Button, ButtonGroup, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { throttle } from "nuqs";

export default function ValueInput() {
  const { params, setParams } = useOperationSearchParams();

  const value = params.value || "";

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setParams(
      { value: newValue || null, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  const handleReset = () => {
    setParams({ value: null, page: 1 });
  };

  return (
    <ButtonGroup className="h-8 ">
      <Input
        placeholder="Поиск по коду...  "
        value={value}
        onChange={handleChangeValue}
        className={cn(
          "w-48 h-8 border-r-0 rounded-r-none",
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
