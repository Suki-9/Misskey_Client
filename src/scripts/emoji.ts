import { api } from "misskey-js";
import { components } from 'misskey-js/autogen/types.js';
import { IndexedDB } from "./indexedDB";

type Mi_Emoji = components['schemas']['EmojiSimple'];
type Mi_EmojiIndex = {
  [key: string]: Mi_Emoji;
};
type Mi_EmojisCategory = Record<string, string[]>;

export class Emoji {
  public index: Mi_EmojiIndex = {};
  private categoryIndex: Mi_EmojisCategory = {};
  private db = new IndexedDB();

  constructor(host: string) {
    this.init(host);
  }

  private modifyIndex = <T extends "category" | undefined>(emojis: Mi_Emoji[], type?: T): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> =>
    type
      ? emojis.reduce<Mi_EmojisCategory>((a, e) => {
        for (const c of e.category ?? []) if (!(c in a)) a[c] = [];
        a[e.name].push(e.name);
        return a;
      }, {})
      : emojis.reduce((a, e) => {
        return { ...a, [e.name]: e };
      }, {});

  private async init(host: string) {
    const result = this.db.readEmojisIndex('host');
    if (await result.then(() => true).catch(() => false)) {
      this.index = this.modifyIndex(await result);
      this.categoryIndex = this.modifyIndex(await result, 'category');
    }
    else this.createEmojiIndex(host, this.db)
  }

  public createEmojiIndex = async (host: string, db: IndexedDB) => {
    const mk = new api.APIClient({
      origin: host,
    });
    const index = await mk.request('emojis', {});
    const result = db.addEmojisIndex(host, index.emojis).then(() => true).catch(() => false);
    if (await result.then(() => true).catch(() => false)) {
      this.index = this.modifyIndex(index.emojis);
      this.categoryIndex = this.modifyIndex(index.emojis, 'category');
    };
  };

  public read<T extends "category" | undefined>(
    type?: "category",
  ): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> {
    return <OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory>>(type
      ? this.categoryIndex
      : this.index);
  }

  public search = (name: string): Mi_Emoji | undefined => this.index[name];
}
