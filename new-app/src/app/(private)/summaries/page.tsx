import { summaryParamsCache } from "@/entities/summary/model/search-params";
import { Summaries } from "@/widgets/summaries";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SummariesPage({ searchParams }: PageProps) {
  const params = await summaryParamsCache.parse(searchParams);
  return <Summaries props={params} />;
}
