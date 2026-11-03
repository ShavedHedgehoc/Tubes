import { summarySpecificationsParamsCache } from "@/entities/summary/model/search-params";
import { SummarySpecifications } from "@/widgets/summary-specifications";

type PageProps = {
  params: Promise<{ summary_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SummarySpecificationsPage({
  params,
  searchParams,
}: PageProps) {
  const { summary_id } = await params;
  const filters = await summarySpecificationsParamsCache.parse(searchParams);

  const combinedParams = {
    ...filters,
    summary_id,
  };
  return <SummarySpecifications props={combinedParams} />;
}
