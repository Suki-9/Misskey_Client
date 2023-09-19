// Import Types ----------------------------------------///
import { Note, Notification } from "../types";

const channels = ["Home", "Hybrid", "local", "global"] as const;

export type Endpoints = {
  "i": {
    method: "POST";
    req: {
      i: string;
    };
    res: {};
  };
  "i/notifications": {
    method: "POST";
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
    method: "POST";
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
    method: "POST";
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
    method: "POST";
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
    method: "POST";
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
    method: "POST";
    req: {
      i: string;
      noteId: string;
      reaction: string;
    };
    res: undefined;
  };
  "notes/reactions/delete": {
    method: "POST";
    req: {
      i: string;
      noteId: string;
    };
    res: undefined;
  };
  "notes/show": {
    method: "POST";
    req: {
      noteId: string;
    };
    res: Note;
  };
};
