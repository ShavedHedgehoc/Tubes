import { VarnishParamsView } from "@/widgets/varnish-params";

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function VarnishParamsPage({ params }: PageProps) {
    const { id } = await params;
    return <VarnishParamsView id={id} />;
}
