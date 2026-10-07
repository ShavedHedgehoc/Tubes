import { apiClient, proxyApiClient } from "@/shared/api";
import { PostsDto } from "./dto";
import { PostsResponce } from "../model";

type options = {
  isServer: boolean;
};

export async function getPosts({
  options,
}: {
  options?: options;
}): Promise<PostsResponce> {
  const res = options?.isServer
    ? await apiClient.get<PostsDto>("posts")
    : await proxyApiClient.get<PostsDto>("posts");

  return {
    posts: res.posts,
  };
}
