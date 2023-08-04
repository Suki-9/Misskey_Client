import { parseEmoji, searchEmoji } from "./emoji";
import { Note, Reaction, User, ModifiedNote } from "./types";

export const noteGen = (noteData: Note): ModifiedNote => {
  const note: Note = noteData.renote ?? noteData;

  const reactions: Reaction[] = Object.entries(note.reactions).map(
    ([reaction, count]) => {
      return {
        name: reaction,
        count,
        link: searchEmoji(reaction.slice(1, reaction.indexOf("@")))[0],
      };
    },
  );

  let renoter: User | undefined;

  if (noteData.renote) {
    renoter = {
      name: parseEmoji(noteData.user.name ?? noteData.user.username),
      username: noteData.user.username,
      avatarUrl: noteData.user.avatarUrl,
    };
  }

  // let files: File[] | undefined;
  // if (note.files) {
  //     files = []
  //     note.files.forEach(file => {
  //         files!.push({
  //             thumbnailUrl: file.thumbnailUrl,
  //             url: file.url,
  //         })
  //     })
  // }

  return {
    id: note.id,
    createdAt: note.createdAt,
    text: note.text && parseEmoji(note.text), // stringじゃないといけないのであれば(note.text && parseEmoji(note.text)) ?? ""
    cw: note.cw,
    user: {
      name: parseEmoji(note.user.name ?? note.user.username),
      username: note.user.username,
      avatarUrl: note.user.avatarUrl,
    },
    files: note.files,
    reactions,
    renoter,
  };
};
