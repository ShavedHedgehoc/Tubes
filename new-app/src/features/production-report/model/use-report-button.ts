import {
  summaryApi,
  useSummarySearchParams,
  useSummaryUiParams,
} from "@/entities/summary";
import { useRoles } from "@/entities/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeXLSX } from "../lib/make-xlsx";

export function useReportButton() {
  const { params } = useSummarySearchParams();

  const { setParams: setUiParams } = useSummaryUiParams();
  const { isPlanner } = useRoles();

  const { mutate, isPending } = useMutation({
    mutationFn: () => summaryApi.getProductionReport(params),
    onMutate: () => {
      setUiParams({ "pending-report": true });
    },
    onSuccess: (data) => {
      if (data) {
        makeXLSX(data);
      }
    },
    onError: (error) => {
      console.error("Ошибка при генерации или скачивании отчета:", error);
      toast.error("Не удалось скачать отчет");
    },
    onSettled: () => {
      setUiParams({ "pending-report": false });
    },
  });

  const actionDisabled = !isPlanner || isPending;

  const handleMakeReportClick = () => {
    if (actionDisabled) return;
    mutate();
  };

  return {
    handleMakeReportClick,
    actionDisabled,
  };
}
