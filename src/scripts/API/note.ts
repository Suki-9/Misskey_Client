import { parseEmoji } from "../emoji";
import { fetchMisskeyAPI } from "./fetchAPI";
import { VNode, h } from 'vue';

import NoteMedia from '../../components/global/Note/NoteMedia.vue'
import ReactionButton from '../../components/global/Note/ReactionButton.vue'


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

// fetchChildrenNotes と fetchFirstNotes は共通化できる。
export const fetchChildrenNotes = async (noteId: string, host: string): Promise<TimeLine | undefined> => {
  return await fetchMisskeyAPI<"notes/children">(
    "notes/children",
    {
      noteId: noteId,
    },
    host
  ).then((fetchNotes: Mi_Note[] | undefined) => fetchNotes?.reduce((accumulator, value) => {
    return {...accumulator, [value.id]: noteGen(value, host)};
  }, {}));
};

export const fetchFirstNotes = async (
  host: string,
  channel: string = "Home",
  token: string
): Promise<TimeLine | undefined> => {
  return await fetchMisskeyAPI(
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
  ).then((fetchNotes: Mi_Note[] | undefined) => fetchNotes?.reverse().reduce((accumulator, value) => {
    return {...accumulator, [value.id]: noteGen(value, host)};
  }, {}));
};

export const old_noteGen = (noteData: Mi_Note, host: string): ModifiedNote => {
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

export const noteGen = (
  noteData: Mi_Note,
  host: string,
): VNode => {
  const note: Mi_Note = noteData.renote ?? noteData;

  const footer = [
    {
      icon: 'icon-comment',
      alt: 'reply',
      func: '',
      value: note.repliesCount,
    },
    {
      icon: 'icon-retweet',
      alt: 'renote',
      func: '',
      value: note.renoteCount,
    },
    {
      icon: 'icon-plus',
      alt: 'reaction',
      func: '',
      value: '',
    },
    {
      icon: 'icon-dot-3',
      alt: 'more',
      func: '',
      value: '',
    },
  ]

  return h('div', {
    class: "Mi_Note"
  }, [
    noteData.renote && h('div',{}, [
      h('img',{
        src: noteData.user.avatarUrl,
      }),
      h('p',{},[
        h('span',{},[
          ...(noteData.user.name ? parseEmoji(noteData.user.name, host, true) : []),
        ]),
        'さんがﾘﾉｰﾄしました。',
        h('i',{
          class: 'icon-retweet'
        })
      ])
    ]),
    h('div',{
      class: 'note',
    },[
      h('img',{
        class: 'userAvatar',
        src: note.user.avatarUrl,
      }),
      h('article',{},[
        h('header',{},[
          h('p',{
            class: 'userName'
          },[
            ...(note.user.name ? parseEmoji(note.user.name, host, true) : [note.user.username]),
            `@${note.user.username}`
          ])
        ]),
        h('div',{
          class: 'parsedMFM',
        },[
          ...(note.text ? parseEmoji(note.text, host, true) : [])
        ]),
        h('div',{
          class: 'files',
        },[
          note.files.map((file) => {
            return h(NoteMedia,{
              mediaData: file
            })
          })
        ]),
        h('div',{
          class: 'reactions',
        },[
          Object.entries(note.reactions).map(reaction => {
            return h(ReactionButton,{
              reaction: reaction,
              note: note,
            });
          })
        ]),
        h('footer',{},[
          footer.map((item) => {
            return h('p',{},[
              h('i',{
                class: item.icon,
                alt: item.alt,
              }),
              item.value
            ])
          })
        ]),
      ])
    ]),
  ])
}