import { Extrusion } from "@/widgets/extrusion";

export default async function ExtrusionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <Extrusion slug={slug} />;
}