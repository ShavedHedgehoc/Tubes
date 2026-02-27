export type RankEntity = {
  id: number;
  val: number;
  description: string;
};
export type RanksResponce = {
  ranks: RankEntity[] | [];
};
