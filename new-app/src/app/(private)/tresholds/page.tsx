import { tresholdParamsCache } from "@/entities/treshold";
import { Tresholds } from "@/widgets/tresholds";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TresholdsPage({ searchParams }: PageProps) {
  const params = await tresholdParamsCache.parse(searchParams);
  return <Tresholds props={params} />;
}
