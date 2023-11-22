import { Emoji } from "../emoji";
import { fetchMisskeyAPI } from "./fetchAPI";
import { VNode, h } from "vue";

import NoteMedia from "../../components/global/Note/NoteMedia.vue";
import ReactionButton from "../../components/global/Note/ReactionButton.vue";

// fetchChildrenNotes と fetchFirstNotes は共通化できる。
export const fetchChildrenNotes = async (noteId: string, host: string): Promise<TimeLine | undefined> => {
  return await fetchMisskeyAPI<"notes/children">(
    "notes/children",
    {
      noteId: noteId,
    },
    host
  ).then(
    (fetchNotes: Mi_Note[] | undefined) =>
      fetchNotes?.reduce((accumulator, value) => {
        return { ...accumulator, [value.id]: noteGen(value, host) };
      }, {})
  );
};

export const fetchFirstNotes = async (
  host: string,
  channel: string = "Home",
  token: string,
  limit?: number,
): Promise<VNode[]> => {
  return await fetchMisskeyAPI(
    `notes/${(channel ?? "home") == "home" ? "" : channel + "-"}timeline` as
    | "notes/timeline"
    | "notes/hybrid-timeline"
    | "notes/local-timeline"
    | "notes/global-timeline",
    {
      i: token,
      limit: limit,
    },
    host
  ).then(
    fetchNotes => fetchNotes?.reverse().map((note: Mi_Note) => new Note(note, host).gen()) ?? []
  );
};

export const noteGen = (noteData: Mi_Note, host: string): VNode => {
  const note: Mi_Note = noteData.renote ?? noteData;
  const emoji = new Emoji(host);

  const footer = [
    {
      icon: "icon-comment",
      alt: "reply",
      func: "",
      value: note.repliesCount,
    },
    {
      icon: "icon-retweet",
      alt: "renote",
      func: "",
      value: note.renoteCount,
    },
    {
      icon: "icon-plus",
      alt: "reaction",
      func: "",
      value: "",
    },
    {
      icon: "icon-dot-3",
      alt: "more",
      func: "",
      value: "",
    },
  ];

  return h(
    "div",
    {
      class: "Mi_Note",
    },
    [
      noteData.renote &&
        h("div", {}, [
          h("img", {
            src: noteData.user.avatarUrl,
          }),
          h("p", {}, [
            h("span", {}, [...(noteData.user.name ? emoji.parse(noteData.user.name, true) : [])]),
            "さんがﾘﾉｰﾄしました。",
            h("i", {
              class: "icon-retweet",
            }),
          ]),
        ]),
      h(
        "div",
        {
          class: "note",
        },
        [
          h("img", {
            class: "userAvatar",
            src: note.user.avatarUrl,
          }),
          h("article", {}, [
            h("header", {}, [
              h(
                "p",
                {
                  class: "userName",
                },
                [
                  ...(note.user.name ? emoji.parse(note.user.name, true) : [note.user.username]),
                  `@${note.user.username}`,
                ]
              ),
            ]),
            h(
              "div",
              {
                class: "parsedMFM",
              },
              note.text ? emoji.parse(note.text, true) : [],
            ),
            h(
              "div",
              {
                class: "files",
              },
              [
                note.files.map(file => {
                  return h(NoteMedia, {
                    mediaData: file,
                  });
                }),
              ]
            ),
            h(
              "div",
              {
                class: "reactions",
              },
              [
                Object.entries(note.reactions).map(reaction => {
                  return h(ReactionButton, {
                    reaction: reaction,
                    note: note,
                  });
                }),
              ]
            ),
            h("footer", {}, [
              footer.map(item => {
                return h("p", {}, [
                  h("i", {
                    class: item.icon,
                    alt: item.alt,
                  }),
                  item.value,
                ]);
              }),
            ]),
          ]),
        ]
      ),
    ]
  );
};

export class Note {
  private noteData: Mi_Note
  private host: string;
  private emoji: Emoji;

  public get: VNode = h('div');

  constructor(
    noteData: Mi_Note,
    host: string,
  ) {
    this.noteData = noteData;
    this.host = host;
    this.emoji = new Emoji(host);
  }

  public gen() {
    const note: Mi_Note = this.noteData.renote ?? this.noteData;

    const footer = [
      {
        icon: "icon-comment",
        alt: "reply",
        func: "",
        value: note.repliesCount,
      },
      {
        icon: "icon-retweet",
        alt: "renote",
        func: "",
        value: note.renoteCount,
      },
      {
        icon: "icon-plus",
        alt: "reaction",
        func: "",
        value: "",
      },
      {
        icon: "icon-dot-3",
        alt: "more",
        func: "",
        value: "",
      },
    ];

    return h(
      "div",
      {
        class: "Mi_Note",
      },
      [
        this.noteData.renote &&
        h("div", {}, [
          h("img", {
            src: this.noteData.user.avatarUrl,
          }),
          h("p", {}, [
            h("span", {}, [...(this.noteData.user.name ? this.emoji.parse(this.noteData.user.name, true) : [])]),
            "さんがﾘﾉｰﾄしました。",
            h("i", {
              class: "icon-retweet",
            }),
          ]),
        ]),
        h(
          "div",
          {
            class: "note",
          },
          [
            h("img", {
              class: "userAvatar",
              src: note.user.avatarUrl,
            }),
            h("article", {}, [
              h("header", {}, [
                h(
                  "p",
                  {
                    class: "userName",
                  },
                  [
                    ...(note.user.name ? this.emoji.parse(note.user.name, true) : [note.user.username]),
                    `@${note.user.username}`,
                  ]
                ),
              ]),
              h(
                "div",
                {
                  class: "parsedMFM",
                },
                note.text ? this.emoji.parse(note.text, true) : [],
              ),
              h(
                "div",
                {
                  class: "files",
                },
                [
                  note.files.map(file => {
                    return h(NoteMedia, {
                      mediaData: file,
                    });
                  }),
                ]
              ),
              h(
                "div",
                {
                  class: "reactions",
                },
                [
                  Object.entries(note.reactions).map(reaction => {
                    return h(ReactionButton, {
                      reaction: reaction,
                      note: note,
                    });
                  }),
                ]
              ),
              h("footer", {}, [
                footer.map(item => {
                  return h("p", {}, [
                    h("i", {
                      class: item.icon,
                      alt: item.alt,
                    }),
                    item.value,
                  ]);
                }),
              ]),
            ]),
          ]
        ),
      ]
    );
  }

  public update() { 

  }
}