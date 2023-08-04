export type HamburgerMenuList = {
  title: string;
  link: string;
}[];

export type modifiedNote = Pick<
  Note,
  "id" | "text" | "cw" | "user" | "files"
> & {
  date?: string;
  reactions?: Reaction[];
  renoter?: User;
};

export type Note = {
  id: string;
  createdAt: string;
  text?: string;
  cw?: string;
  user: User;
  files?: File[];
  reactions?: Record<string, number>;
  renote?: Omit<Note, "renote">;
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
