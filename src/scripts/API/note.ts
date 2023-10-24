//TS Module --------------------------------------------///
import { parseEmoji } from "../emoji";
import { fetchMisskeyAPI } from "./fetchAPI";

const htmlTextEscape = (text: string): string =>
  text.replace(
    /[&'`"<>]/g,
    (match): string =>
      ({
        "&": "&amp;",
        "'": "&#x27;",
        "`": "&#x60;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
      })[match] ?? ""
  );

export const fetchChildrenNotes = async (noteId: string, host: string): Promise<Mi_Note[] | undefined> => {
  return await fetchMisskeyAPI<"notes/children">(
    "notes/children",
    {
      noteId: noteId,
    },
    host
  ).then(fetchNotes => fetchNotes?.map((fetchNote: Mi_Note) => noteGen(fetchNote, host)));
};

export const fetchFirstNotes = async (
  host: string,
  channel: string = "Home",
  token: string
): Promise<ModifiedNote[]> => {
  return fetchMisskeyAPI(
    `notes/${(channel ?? "home") == "home" ? "" : channel + "-"}timeline` as
      | "notes/timeline"
      | "notes/hybrid-timeline"
      | "notes/local-timeline"
      | "notes/global-timeline",
    {
      i: token,
      limit: 10,
    },
    host
  ).then((fetchNotes: Mi_Note[]) => {
    return fetchNotes?.map(note => noteGen(note, host));
  });
};

export const noteGen = (noteData: Mi_Note, host: string): ModifiedNote => {
  const note: Mi_Note = noteData.renote ?? noteData;
  // TODO ここ無理やり過ぎる
  let renoter: Partial<UserData> | undefined;
  let reply: Mi_Note["reply"] | undefined;

  // nameは初期設定だと空の場合があるので空であればidを使う
  note.user.name ??= note.user.username;
  noteData.user.name ??= noteData.user.username;

  if (noteData.renote) {
    renoter = {
      id: noteData.user.id,
      name: noteData.user.name && parseEmoji(noteData.user.name, host),
      username: noteData.user.username,
      avatarUrl: noteData.user.avatarUrl,
    };
  }

  if (noteData.reply) {
    reply = {
      id: note.reply!.id,
      createdAt: note.reply!.createdAt,
      text: note.reply!.text,
      cw: note.reply!.cw,
      user: {
        id: note.reply!.user.id,
        avatarUrl: note.reply!.user.avatarUrl,
        username: note.reply!.user.username,
        name: note.reply!.user.name && parseEmoji(note.reply!.user.name, host),
      },
      files: note.reply!.files,
    };
  }

  return {
    id: note.id,
    createdAt: note.createdAt,
    text: note.text && parseEmoji(htmlTextEscape(note.text), host),
    cw: note.cw,
    user: {
      id: note.user.id,
      name: parseEmoji(htmlTextEscape(note.user.name!), host),
      username: note.user.username,
      avatarUrl: note.user.avatarUrl,
    },
    files: note.files,
    reactionEmojis: note.reactionEmojis,
    myReaction: note.myReaction,
    reactions: note.reactions,
    renoter,
    renoteCount: note.renoteCount,
    reply,
    repliesCount: note.repliesCount,
  };
};
