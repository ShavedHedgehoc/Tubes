import { statusParamsCache } from "@/entities/status";
import { Statuses } from "@/widgets/statuses";

type PageProps = {
  params: Promise<{ summary_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function StatusesPage({
  params,
  searchParams,
}: PageProps) {
  const { summary_id } = await params;
  const filters = await statusParamsCache.parse(searchParams);

  const combinedParams = {
    ...filters,
    summary_id,
  };
  return <Statuses props={combinedParams} />;
}
