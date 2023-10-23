const channels = "Home" | "Hybrid" | "local" | "global";

type Mi_Endpoints = {
  "i": {
    req: {
      i: string;
    };
    res: UserData;
  };
  "i/notifications": {
    req: {
      i?: string;
      untilId?: string;
      maxSize?: number;
      following?: boolean;
      unreadOnly?: boolean;
      markAsRead?: boolean;
      includeTypes?: NotificationType[];
      excludeTypes?: NotificationType[];
    };
    res: Notification[];
  };
  "notes/timeline": {
    req: {
      i: string;
      limit?: number;
      sinceId?: string;
      untilId?: string;
      sinceDate?: string;
      untilDate?: string;
      includeMyRenotes?: boolean;
      includeRenotedMyNotes?: boolean;
      includeLocalRenotes?: boolean;
      withFiles?: boolean;
    };
    res: Note[];
  };
  "notes/hybrid-timeline": Endpoints["notes/timeline"];
  "notes/global-timeline": {
    req: {
      withFiles: boolean;
      limit?: number;
      sinceId?: string;
      untilId?: string;
      sinceDate?: string;
      untilDate?: string;
    };
    res: Note[];
  };
  "notes/local-timeline": {
    req: {
      withFiles: boolean;
      fileType: boolean;
      excludeNsfw: boolean;
      limit?: number;
      sinceId?: string;
      untilId?: string;
      sinceDate?: string;
      untilDate?: string;
    };
    res: Note[];
  };
  "notes/create": {
    req: {
      i?: string;
      visibility: "public" | "home" | "followers";
      visibleUserIds?: string[];
      text?: string;
      cw?: string;
      localOnly: boolean;
      noExtractMentions: boolean;
      noExtractHashtags: boolean;
      noExtractEmojis: boolean;
      fileIds?: string[];
      replyId?: string;
      renoteId?: string;
      channelId?: string;
    };
    res: Note;
  };
  "notes/reactions/create": {
    req: {
      i: string;
      noteId: string;
      reaction: string;
    };
    res: undefined;
  };
  "notes/reactions/delete": {
    req: {
      i: string;
      noteId: string;
    };
    res: undefined;
  };
  "notes/show": {
    req: {
      i: string;
      noteId: string;
    };
    res: Note;
  };
  "notes/children": {
    req: {
      noteId: string;
      limit?: number;
      sinceId?: string;
      untilId?: string;
    };
    res: Note[];
  };
  "users/reactions": {
    req: {
      i: string;
      userId: string;
      limit?: Number;
      sinceId?: string;
      untilId?: string;
      sinceDate?: string;
      untilDate?: string;
    };
    res: NoteReaction[];
  };
};
