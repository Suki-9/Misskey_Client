import { readCookie } from "../Cookie";
import { ModifiedNote, Note, Reaction, User } from "../types";
import { parseEmoji, searchEmoji } from "../emoji";


export const getNote = async (
  host: string,
  channel: string = "",
  maxIndexSize: number = 10,
  token?: string
): Promise<ModifiedNote[]> => {
  channel = (channel == '' || channel =='home') ? '' : `${channel}-`
  const res: Note[] = await fetch(
    `https://${host}/api/notes/${channel}timeline`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token ?? readCookie(`${host}_token`),
        limit: maxIndexSize,
      }),
    }
  )
    .then(response => response.json())
    .then(data => data);

  return res.map(note => noteGen(note));
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
        link: searchEmoji(reaction.slice(1, reaction.indexOf("@")))[0],
      };
    }
  );

  let renoter: User | undefined;

  if (noteData.renote) {
    renoter = {
      name: parseEmoji(noteData.user.name),
      username: noteData.user.username,
      avatarUrl: noteData.user.avatarUrl,
    };
  }

  return {
    id: note.id,
    createdAt: note.createdAt,
    text: note.text && parseEmoji(note.text),
    cw: note.cw,
    user: {
      name: parseEmoji(note.user.name),
      username: note.user.username,
      avatarUrl: note.user.avatarUrl,
    },
    files: note.files,
    reactions,
    renoter,
  };
};
