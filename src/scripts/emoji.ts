export const createEmojiIndex = async (host: string): Promise<void> => {
  let emojis: Mi_EmojiIndex = (
    await fetch(`${host}/api/emojis`)
      .then(response => response.json())
      .then((data): Mi_Emoji[] => data.emojis)
  ).reduce((accumulator, value) => ({ ...accumulator, [value.name]: value }), {});

  let categorys: Record<string, string[]> = {};
  Object.keys(emojis).forEach(key => {
    if (!categorys.hasOwnProperty(emojis[key].category)) categorys[emojis[key].category] = [];
    categorys[emojis[key].category].push(key);
  });

  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));
  localStorage.setItem(`${host}_emojis_category`, JSON.stringify(categorys));
};

export const readEmojiIndex = <T extends "category" | undefined>(host: string, type?: T): OptionalArgBranch<T, Mi_EmojiIndex, Mi_EmojisCategory> => {
  const item = (_host: string) => `${host}_emojis${type ? `_${type}` : ""}`
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

export const parseEmoji = (text: string, host: string): string => {
  text.match(/:.*?:/g)?.forEach(emoji => {
    const url = searchEmoji(emoji, host);
    if (url.isOk) text = text.replace(emoji, `<img class="emoji" src="${url.value}">`);
  });
  return text;
};
