import { fileParamsCache } from "@/entities/file";
import { Files } from "@/widgets/files";

type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FilesPage({ searchParams }: PageProps) {
    const params = await fileParamsCache.parse(searchParams);
    return <Files props={params} />;
}
