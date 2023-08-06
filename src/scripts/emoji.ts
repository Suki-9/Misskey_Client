import { readCookie } from "./cookie";

type Emojis = {
  aliases: string[];
  name: string;
  category: string;
  url: string;
}[];

export const getEmojiIndex = async (
  host = readCookie("loginHost").unwrap()
) => {
  const emojis: Emojis = await fetch(`https://${host}/api/emojis`)
    .then(response => response.json())
    .then(data => data.emojis);

  const index = emojis.map(emoji => emoji.name);

  localStorage.setItem(`${host}_emojis_index`, JSON.stringify(index));
  localStorage.setItem(`${host}_emojis`, JSON.stringify(emojis));
};

export const searchEmoji = (
  name: string,
  host = readCookie("loginHost").unwrap()
): Result<string, Error> => {
  //emojisを取得 -> Key名のみのindexを生成

  const localEmojis = localStorage.getItem(`${host}_emojis`);

  if (!localEmojis) getEmojiIndex(host);

  const emojis: Emojis = JSON.parse(localEmojis!);
  const index: string = JSON.parse(
    localStorage.getItem(`${host}_emojis_index`)!
  );

  if (index.indexOf(name) === -1) return new Err(new Error(name));

  return new Ok(emojis[index.indexOf(name)].url);
};

export const parseEmoji = (text: string) => {
  const regex = /:.*?:/g;
  const matches = text.match(regex);
  matches?.forEach(emoji => {
    const url = searchEmoji(emoji.replaceAll(":", ""));
    if (url.isOk())
      text = text.replace(emoji, `<img class="emoji" src="${url.value}">`);
  });
  return text;
};
