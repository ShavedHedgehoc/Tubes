export type PostEntity = {
  id: number;
  val: number;
  name: string;
};
export type PostsResponce = {
  posts: PostEntity[] | [];
};
