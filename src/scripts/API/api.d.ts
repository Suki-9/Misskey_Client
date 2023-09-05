type channels = "Home" | "Hybrid" | "local" | "global";


type ElementOf<T> = T extends readonly Array<infer E>
  ? E
  : T extends readonly Iterable<infer E>
  ? E
  : never;

type Endpoints = {
  "notes/timeline": {
    method: "POST";
    req: {
      i: string;
      limit?: number;
      sinceId?: string;
      untilId?: string;
      sinceDate?: string;
      untilDate?: string;
      includeMyRenotes: boolean;
      includeRenotedMyNotes: boolean;
      includeLocalRenotes: boolean;
      withFiles: boolean;
    };
    res: { b: string };
  };
};
