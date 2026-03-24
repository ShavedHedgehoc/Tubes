import { useQuery } from "@tanstack/react-query";
import SopService from "@/shared/api/services/sop-service";

export const useOffsetSop = (operationId: number | null) =>
  useQuery({
    queryKey: ["offset_sop", operationId],
    queryFn: () => SopService.getSopPictures(operationId),
    enabled: !!operationId,
  });
