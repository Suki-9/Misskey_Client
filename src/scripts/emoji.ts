// TS Module -------------------------------------------///
import { readCookie } from "./cookie";

// Type ------------------------------------------------///
import { Emoji, EmojiIndex } from "./Types/types";

export const createEmojiIndex = async (host: string): Promise<void> => {
  let emojis: EmojiIndex = (
    await fetch(`${host}/api/emojis`)
      .then(response => response.json())
      .then((data): Emoji[] => data.emojis)
  ).reduce((accumulator, value) => ({ ...accumulator, [value.name]: value }), {});

  let categorys: Record<string, string[]> = {};
  Object.keys(emojis).forEach(key => {
    if (!categorys.hasOwnProperty(emojis[key].category)) categorys[emojis[key].category] = [];
    categorys[emojis[key].category].push(key);
  });

  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));
  localStorage.setItem(`${host}_emojis_category`, JSON.stringify(categorys));
};

export const readEmojiIndex = (type?: string, host = readCookie("loginHost").value) => {
  let localEmojis = localStorage.getItem(`${host}_emojis${type ? `_${type}` : ""}`);

  if (!localEmojis && host) {
    createEmojiIndex(host);
    localEmojis = localStorage.getItem(`${host}_emojis${type ? `_${type}` : ""}`);
  }
  return localEmojis && JSON.parse(localEmojis);
};

export const searchEmoji = (name: string, host = readCookie("loginHost").value): Result<string> => {
  const index: EmojiIndex = readEmojiIndex(undefined, host);
  return index[name.slice(1, name.indexOf("@"))]
    ? { value: index[name.slice(1, name.indexOf("@"))].url, isOk: true }
    : { value: name, isOk: false };
};

export const parseEmoji = (text: string): string => {
  text.match(/:.*?:/g)?.forEach(emoji => {
    const url = searchEmoji(emoji);
    if (url.isOk) text = text.replace(emoji, `<img class="emoji" src="${url.value}">`);
  });
  return text;
};
