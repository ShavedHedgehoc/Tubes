import { summaryCrewsStatsParamsCache } from "@/entities/summary";
import { Perfomance } from "@/widgets/perfomance";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PerfomancePage({ searchParams }: PageProps) {
  const params = await summaryCrewsStatsParamsCache.parse(searchParams);
  return <Perfomance props={params} />;
}
