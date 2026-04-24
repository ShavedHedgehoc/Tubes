import { SealantParams } from "@/widgets/sealant-params";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SealantParamsPage({ params }: PageProps) {
  const { id } = await params;
  return <SealantParams id={id} />;
}
