import { ExtrusionParams } from "@/widgets/extrusion-params";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ExtrusionParamsPage({ params }: PageProps) {
  const { id } = await params;
  return <ExtrusionParams id={id} />;
}
