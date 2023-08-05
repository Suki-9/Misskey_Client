export type HamburgerMenuList = {
  title: string;
  link: string;
}[];

export type ModifiedNote = Pick<
  Note,
  "id" | "createdAt" | "text" | "cw" | "user" | "files"
> & {
  reactions: Reaction[];
  renoter?: User;
};

export type Note = {
  id: string;
  createdAt: string;
  text: string | null;
  cw: string | null;
  user: User;
  files: File[];
  reactions: Record<string, number>;
  renote?: Omit<Note, "renote">;
};

export type Reaction = {
  name: string;
  count: number;
  link: string;
};

export type User = {
  name: string | null;
  username: string;
  avatarUrl: string;
};

export type File = {
  thumbnailUrl: string;
  url: string;
};
