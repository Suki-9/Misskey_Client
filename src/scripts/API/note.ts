import { fetchMisskeyAPI } from "./fetchAPI";

export const fetchFirstNotes = async (
  host: string,
  channel: string = "Home",
  token: string,
  limit: number = 10,
): Promise<Mi_Note[]> => {
  return await fetchMisskeyAPI(
    `notes/${(channel ?? "home") == "home" ? "" : channel + "-"}timeline` as
    | "notes/timeline"
    | "notes/hybrid-timeline"
    | "notes/local-timeline"
    | "notes/global-timeline",
    { i: token,
      limit: limit, },
      host
  )
    .then((fetchNotes: Mi_Note[]) => fetchNotes);
};
