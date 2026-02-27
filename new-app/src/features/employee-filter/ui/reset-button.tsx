"use client";

import { useEmployeeSearchParams } from "@/entities/employee";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function ResetButton() {
  const { params, setParams } = useEmployeeSearchParams();

  const isDirty =
    params.name !== null ||
    (params.ranks && params.ranks.length > 0) ||
    params.banned !== null;

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
