//types
import { ModifiedNote, Note, Reaction, User } from "../types";

//ts module
import { parseEmoji, searchEmoji } from "../emoji";
import { readCookie } from "../cookie";

//vue Component function
import { addNoteBefore } from "../../components/global/TimeLine.vue";


export const getNote = async (
  host: string,
  channel = "",
  maxIndexSize = 10,
  untilId?: string,
  token = readCookie(`${host}_token`).unwrap()
) => {
  channel &&= `${channel}-`;
  const res: Note[] = await fetch(
    `https://${host}/api/notes/${channel}timeline`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token,
        limit: maxIndexSize,
        untilId: untilId,
      }),
    }
  )
    .then(response => response.json())
    .then(data => data);

  res.map(note => addNoteBefore(noteGen(note)));
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

export const postNote = () => {

}