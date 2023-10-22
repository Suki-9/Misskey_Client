export type TimeLine = Record<string, ModifiedNote>;

export type ModifiedNote = Note & {
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
  renoteCount: number;
  reply?: Pick<Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
  repliesCount: number;
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

export type EmojiIndex = {
  [key: string]: {
    category: string;
    aliases: string[];
    name: string;
    url: string;
  };
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


export type UserData = {
  id: string;
  name: string | null;
  username: string;
  host: string | null;
  avatarUrl: string | null;
  avatarBlurhash: string | null;
  isBot: boolean;
  isCat: boolean;
  emojis: {};
  onlineStatus: "online" | "offline";
  badgeRoles: {
    name: string;
    iconUrl: string;
    displayOrder: number;
  }[];
  url: string | null;
  uri: string | null;
  movedTo: string | null;
  alsoKnownAs: string | null,
  createdAt: string;
  updatedAt: string | null;
  lastFetchedAt: string | null;
  bannerUrl: string | null;
  bannerBlurhash: string | null;
  isLocked: boolean;
  isSilenced: boolean;
  isLimited: boolean;
  isSuspended: boolean;
  description: string | null;
  location: string | null;
  birthday: string;
  fields: {
    name: string | null;
    value: string | null;
  }[]
  followersCount: number;
  followingCount: number;
  notesCoun: number;
  pinnedNoteIds: string[] | null;
  pinnedNotes: Note[] | null;
  pinnedPageId: string[] | null;
  pinnedPage: any | null;
  publicReactions: boolean;
  ffVisibility: string;
  twoFactorEnabled: Boolean;
  usePasswordLessLogin: boolean;
  securityKeys: boolean;
  roles: [{
    id: string;
    name: string | null;
    color: string;
    iconUrl: string | null;
    description: string;
    isModerator: boolean;
    isAdministrator: boolean;
    displayOrder: number;
  }];
  memo: string | null;
  avatarId: string | null;
  bannerId: string | null;
  isModerator: boolean;
  isAdmin: boolean;
  injectFeaturedNote: boolean;
  receiveAnnouncementEmail: boolean;
  alwaysMarkNsfw: boolean;
  autoSensitive: boolean;
  carefulBot: boolean;
  autoAcceptFollowed: boolean;
  noCrawle: boolean;
  preventAiLearning: boolean;
  isExplorable: boolean;
  isDeleted: boolean;
  twoFactorBackupCodes: boolean;
  hideOnlineStatus: boolean;
  hasUnreadSpecifiedNotes: boolean;
  hasUnreadMentions: boolean;
  hasUnreadAnnouncement: boolean;
  unreadAnnouncements: Array<any>;
  hasUnreadAntenna: boolean;
  hasUnreadChannel: boolean;
  hasUnreadNotification: boolean;
  hasPendingReceivedFollowRequest: boolean;
  mutedWords: string[];
  mutedInstances: string[];
  mutingNotificationTypes: string[];
  achievements: {
    name: string;
    unlockedAt: number;
  }[];
  loggedInDays: number;
  policies: {
    gtlAvailable: boolean;
    ltlAvailable: boolean;
    canPublicNote: boolean;
    canCreateContent: boolean;
    canUpdateContent: boolean;
    canDeleteContent: boolean;
    canInvite: boolean;
    inviteLimit: number;
    inviteLimitCycle: number;
    inviteExpirationTime: number;
    canManageCustomEmojis: boolean;
    canSearchNotes: boolean;
    canHideAds: boolean;
    driveCapacityMb: number;
    alwaysMarkNsfw: number;
    pinLimit: number;
    antennaLimit: number;
    wordMuteLimit: number;
    webhookLimit: number;
    clipLimit: number;
    noteEachClipsLimit: number;
    userListLimit: number;
    userEachUserListsLimit: number;
    rateLimitFactor: number;
    email: string | null;
    emailVerified: boolean;
    securityKeysList: Array<any>,
  }
}