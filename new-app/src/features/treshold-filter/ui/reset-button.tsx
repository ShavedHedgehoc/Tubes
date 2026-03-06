"use client";

import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { useTresholdSearchParams } from "@/entities/treshold";

export default function ResetButton() {
  const { params, setParams } = useTresholdSearchParams();

  const isDirty =
    params.code !== null ||
    params.conveyors !== null ||
    params.marking !== null;

  const handleReset = () => {
    setParams(null);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="py-0 px-3 text-xs "
      onClick={handleReset}
      disabled={!isDirty}
    >
      <Trash /> Сброс
    </Button>
  );
}
