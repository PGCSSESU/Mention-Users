export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Mention = {
  id: string;
  username: string;
  start: number;
  end: number;
};
