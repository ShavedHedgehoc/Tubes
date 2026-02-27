import { useQuery } from "@tanstack/react-query";
import { getHealthCheck } from "./get-health-check";
import { useHealthStore } from "../model";
import { useEffect } from "react";

export function useHealthcheck() {
  const { setHealthy, setInit } = useHealthStore();

  const query = useQuery({
    queryKey: ["healths"],
    queryFn: async () => {
      await getHealthCheck();
      return true;
    },
    refetchInterval: 10000,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setHealthy(true);
      setInit(true);
    }
    if (query.isError) {
      setHealthy(false);
      setInit(true);
    }
  }, [query.isSuccess, query.isError, setHealthy, setInit]);

  return query;
}
