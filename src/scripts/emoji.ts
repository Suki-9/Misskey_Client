import { VNode, h } from "vue";

//TODO 突貫工事なので後々整理
export class Emoji {
  public index: Mi_EmojiIndex = {};

  private createEmojiIndex = async (host: string): Promise<void> => {
    localStorage.setItem(`${host}_emojis`, JSON.stringify((
      await fetch(`${host}/api/emojis`)
        .then(response => response.json())
        .then((data): Mi_Emoji[] => data.emojis)
    )
      .reduce((accumulator, v) => ({ ...accumulator, [v.name]: v }), {})));
  };

  private async init(host: string) {
    this.index = JSON.parse((host && (localStorage.getItem(`${host}_emojis`) ?? (await this.createEmojiIndex(host), localStorage.getItem(`${host}_emojis`)))) ?? '{}')
  }

  constructor(host: string) {
    this.init(host);
  }

  read<T extends "category" | undefined>(
    type?: "category",
  ): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> {
    return <OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory>>(type
      ? JSON.stringify(Object.values(this.index).reduce<{ [k: string]: string[] }>(
        (accumulator, emoji) =>
          Object.prototype.hasOwnProperty.call(accumulator, emoji.category)
            ? (accumulator[emoji.category].push(emoji.name), accumulator)
            : (accumulator[emoji.category] = [emoji.name], accumulator)
        , {}))
      : this.index);
  }

  search = (name: string): string | undefined =>
    this.index[name.slice(1, name.indexOf("@"))]?.url;

  parse = <T extends boolean | undefined>(
    text: string,
    vnode?: T
  ): OptionalArgBranch<T, string, (VNode | string)[]> => {
    return <OptionalArgBranch<T, string, (VNode | string)[]>>text.split(/(:.*?:)/g).map(item => {
      if (item.match(/:.*?:/g)) {
        const url = this.search(item);
        return url
          ? vnode
            ? h(
              "img",
              { class: "emoji", src: url, }
            )
            : `<img class="emoji" src="${url}">`
          : item;
      } else {
        return item;
      }
    });
  };
}

// 置換が完了次第削除
export const searchEmoji = (name: string, host: string): string | undefined =>
  new Emoji(host).index[name.slice(1, name.indexOf("@"))]?.url

// 置換が完了次第削除
export const readEmojiIndex = <T extends "category" | undefined>(
  host: string,
  type?: T
): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> => {
  return <OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory>>(type
    ? new Emoji(host).index
    : new Emoji(host).index);
};

//TODO 常に VNode で返すようにするべきかも
// 置換が完了次第削除
export const parseEmoji = <T extends boolean | undefined>(
  text: string,
  host: string,
  vnode?: T
): OptionalArgBranch<T, string, (VNode | string)[]> => {
  return <OptionalArgBranch<T, string, (VNode | string)[]>>text.split(/(:.*?:)/g).map(item => {
    if (item.match(/:.*?:/g)) {
      const url = searchEmoji(item, host);
      return url
        ? vnode
          ? h("img", {
              class: "emoji",
              src: url,
            })
          : `<img class="emoji" src="${url}">`
        : item;
    } else {
      return item;
    }
  });
};
