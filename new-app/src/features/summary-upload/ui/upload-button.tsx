"use client";

import { useSummaryUiParams } from "@/entities/summary";
import { Button } from "@/shared/ui";
import { UploadSummariesModal } from "./upload-summaries-modal";
import { useRoles } from "@/entities/user";

export function UploadButton() {
  const { setParams } = useSummaryUiParams();
  const { isUser } = useRoles();

  const handleAddClick = () => {
    setParams({ "upload-summary": true });
  };

  return (
    <div>
      <Button
        size="sm"
        variant="default"
        className=" px-3 h-8 min-h-0 "
        onClick={handleAddClick}
        disabled={!isUser}
      >
        Загрузить
      </Button>
      <UploadSummariesModal />
    </div>
  );
}
