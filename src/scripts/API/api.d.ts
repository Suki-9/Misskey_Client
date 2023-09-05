type channels = 
  | "Home"
  | "Hybrid"
  | "local"
  | "global"

type Endpoints ={ 
  "notes/timeline": {
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
    }
    res: { b: string }
  },

}