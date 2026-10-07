"use client";

import { useProductSearchParams } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function ResetButton() {
  const { params, setParams } = useProductSearchParams();

  const isDirty =
    params.name !== null || params.code !== null || params.marking !== null;

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
