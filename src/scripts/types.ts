export type ModifiedNote = Pick<Note, "id" | "createdAt" | "text" | "cw" | "user" | "files" | "myReaction"> & {
  reactionEmojis: Record<string, string>;
  reactions: Record<string, number>;
  renoter?: User;
  reply?: Pick<Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
};

export type NoteReaction = {
  id: string;
  createdAt: string;
  user: User;
  type: string;
  note: Note;
};

export type Note = {
  id: string;
  createdAt: string;
  text: string | null;
  cw: string | null;
  user: User;
  files: File[];
  myReaction?: string;
  reactionEmojis: Record<string, string>;
  reactions: Record<string, number>;
  renote?: Omit<Note, "renote">;
  reply?: Pick<Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
};

export type Reaction = {
  name: string;
  count?: number;
  link: string;
};

export type Emoji = {
  aliases: string[];
  category: string;
  name: string;
  url: string;
};

export type User = {
  id: string;
  name: string | null;
  username: string;
  avatarUrl: string;
  followingCount?: number;
  followersCount?: number;
};

export type File = {
  thumbnailUrl: string;
  createdAt: string;
  url: string;
  isSensitive: boolean;
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

export type MainStreamEventType =
  | "Notification"
  | "mention"
  | "reply"
  | "renote"
  | "follow"
  | "followed"
  | "unfollow"
  | "messagingMessage"
  | "readAllNotifications"
  | "unreadNotification"
  | "unreadMention"
  | "readAllUnreadMentions"
  | "unreadSpecifiedNote"
  | "readAllUnreadSpecifiedNotes"
  | "unreadMessagingMessage"
  | "readAllMessagingMessages";

export type PostData = {
  i: string;
  limit: number;
  following: boolean;
  unreadOnly: boolean;
  markAsRead: boolean;
};
