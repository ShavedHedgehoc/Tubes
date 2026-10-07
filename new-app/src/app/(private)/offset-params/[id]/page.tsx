import { OffsetParams } from "@/widgets/offset-params";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OffsetParamsPage({ params }: PageProps) {
  const { id } = await params;
  return <OffsetParams id={id} />;
}
