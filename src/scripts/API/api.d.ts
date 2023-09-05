import { Note } from "../types"

const channels = ["Home" , "Hybrid" , "local" , "global"] as const;


type ElementOf<T> = T extends readonly Array<infer E>
  ? E
  : T extends readonly Iterable<infer E>
  ? E
  : never;

export type Endpoints = {
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
    method: "POST",
    req: {
      i?: string;
      visibility: "public" | "home" | "followers";
      visibleUserIds?: string[];
      text?: string;
      cw?: string;
      localOnly: boolean;
      noExtractMentions: boolean = false,
      noExtractHashtags: boolean = false,
      noExtractEmojis: boolean = false,
      fileIds?: string[],
      replyId?: string,
      renoteId?: string,
      channelId?: string
    },
    res: Note,
  }
};