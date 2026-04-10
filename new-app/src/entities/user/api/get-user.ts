import { UserEntity } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";
import { UserDto } from "./dto/user.dto";

export type GetUserArgs = {
    id: string | null;
    options?: { isServer: boolean };
};

export const getUser = async ({
    options,
    id,
}: GetUserArgs): Promise<UserEntity> => {
    const client = options?.isServer ? apiClient : proxyApiClient;
    const res = await client.get<UserDto>(
        `${USER_ENDPOINTS.DETAIL}${id}`,
    );
    return res;
};
