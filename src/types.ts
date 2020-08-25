export type TPlayer = {
  id: number;
  name: string;
  email: string;
};

export type TScore = {
  player: TPlayer;
  score: number;
};
