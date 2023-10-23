type LoginUser = {
  token: string;
  avatarURL: string;
  host: string;
  userName: string;
}

type ModifiedNote = Mi_Note & {
  reactionEmojis: Record<string, string>;
  reactions: Record<string, number>;
  renoter?: User;
  reply?: Pick<Mi_Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
};


type ModifiedNotification = {
  id: string;
  user: User;
  type: Mi_NotificationType;
  text?: string | null;
  note?: ModifiedNote;
  reaction?: Mi_Reaction;
};