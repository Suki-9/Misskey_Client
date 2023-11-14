import { VNode, h } from "vue";

export const createEmojiIndex = async (host: string): Promise<void> => {
  const emojis: Mi_EmojiIndex = (
    await fetch(`${host}/api/emojis`)
      .then(response => response.json())
      .then((data): Mi_Emoji[] => data.emojis)
  ).reduce((accumulator, value) => ({ ...accumulator, [value.name]: value }), {});

  const categorys: Record<string, string[]> = {};
  Object.keys(emojis).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(categorys, emojis[key].category)) categorys[emojis[key].category] = [];
    categorys[emojis[key].category].push(key);
  });

  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));
  localStorage.setItem(`${host}_emojis_category`, JSON.stringify(categorys));
};

export const readEmojiIndex = <T extends "category" | undefined>(
  host: string,
  type?: T
): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> => {
  const item = (_host: string) => `${_host}_emojis${type ? `_${type}` : ""}`;
  let localEmojis = localStorage.getItem(item(host));

  if (!localEmojis && host) {
    createEmojiIndex(host);
    localEmojis = localStorage.getItem(item(host));
  }
  return (localEmojis && JSON.parse(localEmojis)) ?? <OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory>>{};
};

export const searchEmoji = (name: string, host: string): Result<string> => {
  const index = readEmojiIndex(host);
  return index && index[name.slice(1, name.indexOf("@"))]
    ? { value: index[name.slice(1, name.indexOf("@"))].url, isOk: true }
    : { value: name, isOk: false };
};

export const parseEmoji = <T extends boolean | undefined>(
  text: string,
  host: string, 
  vnode?: T,
): OptionalArgBranch<T, string, (VNode | string)[]> => {
  return <OptionalArgBranch<T, string, (VNode | string)[]>>text.split(/(:.*?:)/g).map(item => {
    if (item.match(/:.*?:/g)) {
      const url = searchEmoji(item, host);
      return url.isOk
        ? vnode
          ? h('img',{
              class: 'emoji',
              src: url.value,
            })
          : `<img class="emoji" src="${url.value}">`
        : item
    } else {
      return item
  }})
};
