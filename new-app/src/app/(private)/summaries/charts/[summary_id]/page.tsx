import { summaryDetailParamsCache } from "@/entities/summary/model/search-params";
import { SummaryCharts } from "@/widgets/summary-charts";

type PageProps = {
  params: Promise<{ summary_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SummaryChartsPage({
  params,
  searchParams,
}: PageProps) {
  const { summary_id } = await params;
  const filters = await summaryDetailParamsCache.parse(searchParams);

  const combinedParams = {
    ...filters,
    summary_id,
  };
  return <SummaryCharts props={combinedParams} />;
}
