"use client";

import { Button } from "@/shared/ui";
import { FileSpreadsheet } from "lucide-react";
import { useReportButton } from "../model/use-report-button";

export function ReportButton() {
  const { handleMakeReportClick, actionDisabled } = useReportButton();

  return (
    <div>
      <Button
        size="sm"
        variant="default"
        className=" px-3 h-8 min-h-0 "
        onClick={handleMakeReportClick}
        disabled={actionDisabled}
      >
        <FileSpreadsheet />
        Отчет
      </Button>
    </div>
  );
}
