import { userParamsCache } from "@/entities/user";
import { Users } from "@/widgets/users";


type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UsersPage({ searchParams }: PageProps) {
    const params = await userParamsCache.parse(searchParams);
    return <Users props={params} />;
}
