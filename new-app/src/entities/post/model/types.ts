export type PostEntity = {
  id: number;
  value: number;
  name: string;
};
export type PostsResponce = {
  posts: PostEntity[] | [];
};
