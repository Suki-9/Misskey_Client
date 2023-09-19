//types
import { ModifiedNote, Note, Reaction, User } from "../types";

//ts module
import { parseEmoji, searchEmoji } from "../emoji";

const htmlTextEscape = (text: string): string => {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("&", "&amp;");
};

export const noteGen = (noteData: Note): ModifiedNote => {
  const note: Note = noteData.renote ?? noteData;

  // nameは初期設定だと空の場合があるので空であればidを使う
  note.user.name ??= note.user.username;
  noteData.user.name ??= noteData.user.username;

  const reactions: Reaction[] = Object.entries(note.reactions).map(
    ([reaction, count]) => {
      return {
        name: reaction,
        count,
        link: searchEmoji(reaction.slice(1, reaction.indexOf("@"))).unwrap_or(
          ""
        ),
      };
    }
  );

  let renoter: User | undefined;

  if (noteData.renote) {
    renoter = {
      id: noteData.user.id,
      name: parseEmoji(noteData.user.name),
      username: noteData.user.username,
      avatarUrl: noteData.user.avatarUrl,
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
    reactions,
    renoter,
  };
};
