// Types -----------------------------------------------///
import { ModifiedNote, Note, User } from "../types";

//TS Module --------------------------------------------///
import { parseEmoji } from "../emoji";
import { fetchMisskeyAPI } from "./fetchAPI";
import { readCookie } from "../cookie";

const htmlTextEscape = (text: string): string => {
  return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("&", "&amp;");
};

export const fetchChildrenNotes = async (noteId: string): Promise<Note[] | undefined> => {
  return await fetchMisskeyAPI<"notes/children">("notes/children", {
    noteId: noteId,
  }).then(fetchNotes => fetchNotes?.map(fetchNote => noteGen(fetchNote)));
}

export const fetchFirstNotes = async (host: string, channel: string = "Home"): Promise<ModifiedNote[]> => {
  console.log(channel);
  return fetchMisskeyAPI(
    `notes/${(channel ?? "home") == "home" ? "" : channel + "-"}timeline` as
      | "notes/timeline"
      | "notes/hybrid-timeline"
      | "notes/local-timeline"
      | "notes/global-timeline",
    {
      i: readCookie(`${host}_token`).unwrap(),
      limit: 10,
    },
    host
  ).then(fetchNotes => {
    //@ts-ignore
    return fetchNotes?.map(note => noteGen(note));
  });
};

export const noteGen = (noteData: Note): ModifiedNote => {
  const note: Note = noteData.renote ?? noteData;
  let renoter: User | undefined;
  let reply: Note["reply"] | undefined;

  // nameは初期設定だと空の場合があるので空であればidを使う
  note.user.name ??= note.user.username;
  noteData.user.name ??= noteData.user.username;

  if (noteData.renote) {
    renoter = {
      id: noteData.user.id,
      name: parseEmoji(noteData.user.name),
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
        name: parseEmoji(note.reply!.user.name!),
      },
      files: note.reply!.files,
    };
  }

  return {
    id: note.id,
    createdAt: note.createdAt,
    text: note.text && parseEmoji(htmlTextEscape(note.text)),
    cw: note.cw,
    user: {
      id: note.user.id,
      name: parseEmoji(htmlTextEscape(note.user.name)),
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
