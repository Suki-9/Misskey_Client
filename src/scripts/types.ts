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
  count?: number;
  link: string;
};

export type User = {
  name: string | null;
  username: string;
  avatarUrl: string;
};

export type File = {
  thumbnailUrl: string;
  createdAt: string;
  url: string;
};

export type NotificationType =
  | "follow"
  | "mention"
  | "reply"
  | "renote"
  | "quote"
  | "reaction"
  | "pollVote"
  | "pollEnded"
  | "followRequestAccepted"
  | "groupInvited"
  | "app";

export type Notification = {
  id: string;
  user: User;
  type: NotificationType;
  note: Note;
  reaction?: string;
};

export type ModifiedNotification = {
  id: string;
  user: User;
  type: NotificationType;
  text?: string | null;
  note?: ModifiedNote;
  reaction?: Reaction;
};

export type PostData = {
  i: string;
  limit: number;
  following: boolean;
  unreadOnly: boolean;
  markAsRead: boolean;
};
