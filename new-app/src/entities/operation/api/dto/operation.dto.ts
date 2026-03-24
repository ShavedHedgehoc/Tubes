type PostDto = {
  id: number;
  value: string;
  name: string;
};

type RankDto = {
  id: number;
  value: string;
  description: string;
};

type OperationDto = {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
};

type OperationWithRanksAndPostsDto = OperationDto & {
  post: PostDto;
  min_rank: RankDto;
};

type FilePath = {
  id: number;
  name: string;
  path: string;
  description: string;
};

type OperationPicture = {
  id: number;
  operation_id: number;
  file_path_id: number;
  order: number;
};

type OperationPictureWithPath = OperationPicture & {
  file_path: FilePath;
};
export type OperationWithPicturesDto = OperationWithRanksAndPostsDto & {
  operation_pictures: OperationPictureWithPath[];
};
