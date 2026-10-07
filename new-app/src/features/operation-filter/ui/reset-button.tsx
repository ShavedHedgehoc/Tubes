"use client";

import { useOperationSearchParams } from "@/entities/operation";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function ResetButton() {
  const { params, setParams } = useOperationSearchParams();

  const isDirty =
    params.value !== null ||
    params.description !== null ||
    (params.posts && params.posts.length > 0) ||
    (params.min_ranks && params.min_ranks.length > 0) ||
    params.isInactive !== null;

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
