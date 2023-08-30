//types
import { ModifiedNote, Note, Reaction, User } from "../types";

//ts module
import { parseEmoji, searchEmoji } from "../emoji";
import { readCookie } from "../cookie";

//vue Component function
import { addNoteBefore } from "../../components/global/TimeLine.vue";

const htmlTextEscape = (text: string): string => {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("&", "&amp;")
}

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
      id: noteData.user.id,
      name: parseEmoji(noteData.user.name),
      username: noteData.user.username,
      avatarUrl: noteData.user.avatarUrl,
    };
  }

  console.log(note.files)

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

export const postNote = async (
  host: string = readCookie("loginHost").unwrap(),
  token: string = readCookie(`${host}_token`).unwrap(),
  visibility: string = "public",
  text?: string,
  cw?: string,
  localOnly: boolean = false,
  noExtractMentions: boolean = false,
  noExtractHashtags: boolean = false,
  noExtractEmojis: boolean = false,
  fileIds?: string[],
  replyId?: string,
  renoteId?: string,
  channelId?: string,
) => {
  const res = await fetch(
    `https://${host}/api/notes/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        i: token,
        visibility: visibility,
        text: text,
        cw: cw,
        localOnly: localOnly,
        noExtractMentions: noExtractMentions,
        noExtractHashtags: noExtractHashtags,
        noExtractEmojis: noExtractEmojis,
        fileIds: fileIds,
        replyId: replyId,
        renoteId: renoteId,
        channelId: channelId,
      }),
    }
  )
    .then(response => response.json())
    .then(data => data);
  console.log(await res)
};