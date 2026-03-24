import { operationParamsCache } from "@/entities/operation";
import { Operations } from "@/widgets/operations/ui/operations";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OperationsPage({ searchParams }: PageProps) {
  const params = await operationParamsCache.parse(searchParams);
  return <Operations props={params} />;
}
