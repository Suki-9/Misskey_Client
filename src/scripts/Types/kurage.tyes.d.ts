type LoginUser = {
  token: string;
  avatarURL: string;
  host: string;
  userName: string;
}

type ModifiedNote = Note & {
  reactionEmojis: Record<string, string>;
  reactions: Record<string, number>;
  renoter?: User;
  reply?: Pick<Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
};


type ModifiedNotification = {
  id: string;
  user: User;
  type: NotificationType;
  text?: string | null;
  note?: ModifiedNote;
  reaction?: Reaction;
};