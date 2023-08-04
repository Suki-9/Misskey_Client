export type HamburgerMenuList = {
  title: string;
  link: string;
}[];

export type Note = {
  id: string;
  date?: string;
  text?: string;
  cw?: boolean;
  user: User;
  files?: File[];
  reactions?: Reaction[];
  renoter?: User;
};

export type NoteData = {
  id: string;
  createdAt: string;
  text?: string;
  cw?: boolean;
  user: User;
  files?: File[];
  reactions?: Record<string, number>;
  renote?: {
    id: string;
    createdAt: string;
    text?: string;
    cw?: boolean;
    files?: File[];
    user: User;
  };
};

export type Reaction = {
  name: string;
  count: number;
  link: string;
};

export type User = {
  name?: string;
  username: string;
  avatarUrl: string;
};

export type File = {
  thumbnailUrl: string;
  url: string;
};
